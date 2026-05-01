import { useCallback, useEffect, useState } from "react";
import {
  createAdminAppliance,
  deleteAdminAppliance,
  getAdminAppliances,
} from "../api/solarApi";
import {
  applianceCategoryOptions,
  applianceImageFor,
} from "../data/applianceCatalog";

const emptyAppliance = {
  name: "",
  default_watts: 0,
  category: "default",
  is_active: true,
};

export default function AdminPage({ setAuth }) {
  const [appliances, setAppliances] = useState([]);
  const [newAppliance, setNewAppliance] = useState(emptyAppliance);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleUnauthorized = useCallback((err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("token");
      setAuth(false);
      return true;
    }

    return false;
  }, [setAuth]);

  const fetchAppliances = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAdminAppliances();
      setAppliances(res.data);
    } catch (err) {
      if (!handleUnauthorized(err)) {
        setError("Could not load appliances.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadAppliances = async () => {
      try {
        const res = await getAdminAppliances();
        if (active) {
          setAppliances(res.data);
        }
      } catch (err) {
        if (active && !handleUnauthorized(err)) {
          setError("Could not load appliances.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAppliances();

    return () => {
      active = false;
    };
  }, [handleUnauthorized]);

  const createAppliance = async (event) => {
    event.preventDefault();

    if (!newAppliance.name.trim() || newAppliance.default_watts <= 0) {
      setError("Enter an appliance name and watts greater than zero.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await createAdminAppliance({
        ...newAppliance,
        name: newAppliance.name.trim(),
      });
      setNewAppliance(emptyAppliance);
      fetchAppliances();
    } catch (err) {
      if (!handleUnauthorized(err)) {
        setError("Error creating appliance.");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteAppliance = async (id) => {
    try {
      await deleteAdminAppliance(id);
      fetchAppliances();
    } catch (err) {
      if (!handleUnauthorized(err)) {
        setError("Error deleting appliance.");
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <h2>Admin Panel</h2>
          <p>Add custom appliances to the calculator catalog.</p>
        </div>
      </div>

      <div className="admin-layout">
        <form className="card admin-form" onSubmit={createAppliance}>
          <h3>Add Appliance</h3>

          <div className="admin-preview">
            <img src={applianceImageFor(newAppliance)} alt="Appliance preview" />
            <span>{newAppliance.name || "New appliance"}</span>
          </div>

          <label>
            <span>Appliance name</span>
            <input
              placeholder="Standing Fan"
              value={newAppliance.name}
              onChange={(event) =>
                setNewAppliance({ ...newAppliance, name: event.target.value })
              }
            />
            <small>This is the name users will see on the calculator tile.</small>
          </label>

          <label>
            <span>Default watts</span>
            <input
              type="number"
              min="1"
              placeholder="75"
              value={newAppliance.default_watts}
              onChange={(event) =>
                setNewAppliance({
                  ...newAppliance,
                  default_watts: Number(event.target.value),
                })
              }
            />
            <small>This pre-fills the watts field; users can still adjust it before calculating.</small>
          </label>

          <label>
            <span>Image category</span>
            <select
              value={newAppliance.category}
              onChange={(event) =>
                setNewAppliance({ ...newAppliance, category: event.target.value })
              }
            >
              {applianceCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <small>Choose the closest visual type so the appliance gets the right image.</small>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={newAppliance.is_active}
              onChange={(event) =>
                setNewAppliance({
                  ...newAppliance,
                  is_active: event.target.checked,
                })
              }
            />
            <span>
              Show on calculator
              <small>Visible appliances appear on the home page for users to select.</small>
            </span>
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "Add Appliance"}
          </button>
        </form>

        <div className="card admin-list">
          <div className="admin-list-header">
            <h3>Custom Appliances</h3>
            <span>{appliances.length} total</span>
          </div>

          {loading && <p>Loading appliances...</p>}
          {!loading && appliances.length === 0 && <p>No custom appliances yet.</p>}

          <div className="admin-appliance-list">
            {appliances.map((appliance) => (
              <div className="admin-appliance-item" key={appliance.id}>
                <img src={applianceImageFor(appliance)} alt={appliance.name} />

                <div>
                  <strong>{appliance.name}</strong>
                  <span>
                    {appliance.default_watts}W - {appliance.category || "other"}
                  </span>
                  <small>{appliance.is_active ? "Visible" : "Hidden"}</small>
                </div>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => deleteAppliance(appliance.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

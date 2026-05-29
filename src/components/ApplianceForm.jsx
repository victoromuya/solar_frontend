import { useEffect, useMemo, useState } from "react";
import ApplianceRow from "./ApplianceRow";
import { createCalculation, getAppliances, getCalculation } from "../api/solarApi";
import {
  applianceImageFor,
  fallbackAppliances,
  mergeApplianceCatalog,
} from "../data/applianceCatalog";

export default function ApplianceForm({ onResult }) {
  const [catalog, setCatalog] = useState(fallbackAppliances);
  const [appliances, setAppliances] = useState([]);
  const [system, setSystem] = useState({
    backup_hours: 5,
    system_voltage: 12,
    sunlight_hours: 5,
  });
  const [loading, setLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const res = await getAppliances();
        if (res.data.length > 0) {
          setCatalog(mergeApplianceCatalog(res.data));
        }
      } catch {
        setCatalogError("Using sample appliance options while the catalog is unavailable.");
      }
    };

    loadCatalog();
  }, []);

  const selectedKeys = useMemo(
    () => new Set(appliances.map((appliance) => appliance.catalogKey)),
    [appliances]
  );

  const addAppliance = (appliance) => {
    const catalogKey = appliance.catalogKey || String(appliance.id || appliance.name);

    if (selectedKeys.has(catalogKey)) {
      return;
    }

    setAppliances([
      ...appliances,
      {
        catalogKey,
        image: applianceImageFor(appliance),
        name: appliance.name,
        quantity: 1,
        watts: Number(appliance.default_watts) || 0,
        hours_per_day: 1,
      },
    ]);
  };

  const update = (index, field, value) => {
    const updated = [...appliances];
    updated[index][field] = value;
    setAppliances(updated);
  };

  const remove = (index) => {
    setAppliances(appliances.filter((_, i) => i !== index));
  };

  const submit = async () => {
    setLoading(true);

    try {
      const payload = {
        appliances: appliances.map((appliance) => ({
          name: appliance.name,
          quantity: appliance.quantity,
          watts: appliance.watts,
          hours_per_day: appliance.hours_per_day,
        })),
        ...system,
      };

      const res = await createCalculation(payload);
      const full = await getCalculation(res.data.id);

      onResult(full.data);
    } catch (err) {
      console.error(err);
      alert("Error calculating system");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-surface">
      <div className="section-heading">
        <div>
          <span>Step 1</span>
          <h2>Select appliances</h2>
        </div>
        <p>Choose every appliance you want the solar system to support.</p>
      </div>

      {catalogError && <p className="notice">{catalogError}</p>}

      <div className="appliance-grid">
        {catalog.map((appliance) => {
          const catalogKey = appliance.catalogKey || String(appliance.id || appliance.name);
          const selected = selectedKeys.has(catalogKey);

          return (
            <button
              type="button"
              key={catalogKey}
              className={`appliance-tile${selected ? " selected" : ""}`}
              onClick={() => addAppliance(appliance)}
            >
              <img src={applianceImageFor(appliance)} alt={appliance.name} />
              <span>{appliance.name}</span>
              <small>{Number(appliance.default_watts) || 0}W</small>
              <em>{appliance.source}</em>
            </button>
          );
        })}
      </div>

      <div className="card system-card">
        <div className="system-card-header">
          <span>Step 2</span>
          <h3>System Details</h3>
        </div>

        <label>
          <span>Backup hours</span>
          <input
            type="number"
            min="1"
            value={system.backup_hours}
            onChange={(e) =>
              setSystem({ ...system, backup_hours: Number(e.target.value) })
            }
          />
          <small>How long the batteries should power the selected appliances when grid power is off.</small>
        </label>

        <label>
          <span>System voltage</span>
          <select
            value={system.system_voltage}
            onChange={(e) =>
              setSystem({ ...system, system_voltage: Number(e.target.value) })
            }
          >
            <option value={12}>12V</option>
            <option value={24}>24V</option>
            <option value={48}>48V</option>
          </select>
          <small>Higher voltage systems are usually used for larger loads and bigger battery banks.</small>
        </label>

        <label>
          <span>Sunlight hours</span>
          <input
            type="number"
            min="1"
            value={system.sunlight_hours}
            onChange={(e) =>
              setSystem({ ...system, sunlight_hours: Number(e.target.value) })
            }
          />
          <small>Average peak sun hours available per day in the installation location.</small>
        </label>
      </div>

      {appliances.length > 0 && (
        <div className="selected-section">
          <div className="section-heading compact">
            <div>
              <span>Step 3</span>
              <h2>Review selected appliances</h2>
            </div>
            <p>Fine tune each item before calculating your recommendation.</p>
          </div>

          {appliances.map((appliance, index) => (
            <ApplianceRow
              key={appliance.catalogKey}
              index={index}
              appliance={appliance}
              update={update}
              remove={remove}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className="calculate-button"
        onClick={submit}
        disabled={loading || appliances.length === 0}
      >
        {loading ? "Recommending..." : "Recommend"}
      </button>
    </div>
  );
}

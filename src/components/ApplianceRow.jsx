export default function ApplianceRow({ index, appliance, update, remove }) {
  return (
    <div className="selected-appliance">
      <img src={appliance.image} alt={appliance.name} />

      <div className="selected-appliance-name">
        <strong>{appliance.name}</strong>
        <span>Edit the usage values for this appliance.</span>
      </div>

      <label>
        <span>Quantity</span>
        <input
          type="number"
          min="1"
          value={appliance.quantity}
          onChange={(e) => update(index, "quantity", Number(e.target.value))}
        />
        <small>How many of this appliance will run on the system.</small>
      </label>

      <label>
        <span>Watts</span>
        <input
          type="number"
          min="1"
          value={appliance.watts}
          onChange={(e) => update(index, "watts", Number(e.target.value))}
        />
        <small>The power rating on the appliance label. Use the default if unsure.</small>
      </label>

      <label>
        <span>Hours/day</span>
        <input
          type="number"
          min="1"
          value={appliance.hours_per_day}
          onChange={(e) =>
            update(index, "hours_per_day", Number(e.target.value))
          }
        />
        <small>Estimated number of hours this appliance is used each day.</small>
      </label>

      <button type="button" onClick={() => remove(index)}>
        Remove
      </button>
    </div>
  );
}

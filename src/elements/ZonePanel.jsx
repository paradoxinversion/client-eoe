const ZonePanel = ({ title, zones }) => {
  return (
    <section className="mb-4">
      <header className="text-xl font-bold border-b p-4">
        <p>{title}</p>
      </header>
      <div className="p-2">
        {zones.map((zone) => (
          <div key={zone.id}>
            <p>{zone.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZonePanel;

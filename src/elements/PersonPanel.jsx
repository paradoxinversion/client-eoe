const PersonPanel = ({ title, people }) => {
  return (
    <section className="border rounded border-white mb-4">
      <header className="text-xl font-bold border-b p-4">
        <p>{title}</p>
      </header>
      <div className="p-2">
        {people.map((person) => (
          <div key={person.id}>
            <p>{person.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonPanel;

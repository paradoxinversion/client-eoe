gameData is the object that holds data the client requires to run the game. Each major data type from the library is represented here, along with some other properties to help ease development.

This is the shape of the gameData object

```
{
    nations: {},
    governingOrganizations: {},
    zones: {},
    people: {},
    player: {
        empireId: "",
        overlordId: "",
    }
}
```

This object can be serialized in order to create a savegame.

> Caveat: Since JSON serialization is human readable and editable, savegames can be easily tampered with.

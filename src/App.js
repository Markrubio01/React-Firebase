import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DataGrid  from "./components/DataGrid";
import Dialog from "./components/Dialog";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  function getEmployees() {
    setLoading(true);
    const todoRef = firebase.database().ref("Employees");
    todoRef.on("value", (snapshot) => {
      const items = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach((doc, v) => {
          items.push({
            id: doc,
            name: snapshot.val()[doc].name,
            lastname: snapshot.val()[doc].lastname,
          });
        });
      }
      setEmployees(items);
      setLoading(false);
    });
  }

  function onDelete(id) {
    firebase
      .database()
      .ref("Employees/" + id)
      .remove();
  }

  const handleEditCellChange = React.useCallback(({ id, field, props }) => {
    const data = employees.filter((d) => d.id == id);
    if (data !== [] || data !== null || data !== undefined) {
      data[0][field] = props.value;
      firebase
        .database()
        .ref("Employees/" + id)
        .set({
          name: data[0].name,
          lastname: data[0].lastname,
        });
    }
  });

  useEffect(() => {
    getEmployees();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ height: 400, width: "50%", margin: "auto", minWidth: "450px"}}>
      <DataGrid rows={employees}
        columns={[
          { field: "id", headerName: "ID", width: 250, hide: true },
          {
            field: "name",
            headerName: "Name",
            width: 150,
            editable: true,
          },
          {
            field: "lastname",
            headerName: "Last Name",
            width: 150,
            editable: true,
          },
          {
            field: "Operations",
            headerName: " ",
            width: 60,
            renderCell: (params) => {
              const onRemove = () => {
                onDelete(params.id);
              };
              return (
                <IconButton aria-label="delete" onClick={onRemove}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              );
            },
          },
          {
            field: " ",
            headerName: " ",
            width: 90,
            renderHeader: (params) => <Dialog />,
          },
        ]}
        onEditCellChange={handleEditCellChange}
        pageSize={5}/>
    </div> 
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import firebase from "../../firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

let objectList = [
  {
    key: "a1",
    type: "image",
    width: "300px",
    height: "auto",
    top: "500px",
    left: "350px",
    url: "images/ca1.webp",
  },
  {
    key: "a2",
    type: "image",
    width: "300px",
    height: "350px",
    top: "10px",
    left: "350px",
    url: "images/ca1.webp",
  },
  {
    key: "a3",
    type: "image",
    width: "300px",
    height: "350px",
    top: "10px",
    left: "1000px",
    url: "images/ca1.webp",
  },
];
const typeList = [{ name: "Image" }, { name: "Video" }];
export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = useState(false);
  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [type, setType] = useState("Select Type");
  const [rowData, setRowData] = useState("");
  const [objectId, setObjectId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const saveDetails = (e) => {
    var dateNow = Date.now();
    firebase
      .database()
      .ref("websiteContent/objects/" + dateNow)
      .set(
        {
          ref: dateNow,
          name,
          width,
          top,
          left,
        },
        (error) => {
          if (error) {
            alert("Error Occured");
            setOpen(false);
          } else {
            alert("Saved");
            setReload(!reload);
            setOpen(false);
          }
        }
      );
  };

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/objects")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }

        setRowData(data);
      });
  }, [reload]);

  const BtnCellRenderer = (props) => {
    return (
      <DeleteIcon
        color="secondary"
        onClick={() => {
          firebase
            .database()
            .ref("websiteContent/objects/" + props.data.ref)
            .remove();
          alert(JSON.stringify(props.data));
        }}
      />
    );
  };
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "type", sortable: true, filter: true },
      { field: "name", sortable: true, filter: true },
      { field: "width", sortable: true, filter: true },
      { field: "height", sortable: true, filter: true },
      { field: "top", sortable: true, filter: true },
      { field: "left", sortable: true, filter: true },
      { cellRenderer: "btnCellRenderer", minWidth: 150 },
    ],
    frameworkComponents: {
      btnCellRenderer: BtnCellRenderer,
    },

    // other grid options ...
  };
  const uploadImage = (file) => {
    let imageId = Date.now();
    firebase
      .storage()
      .ref("objects/" + imageId)
      .put(file)
      .then((snapshot) => {
        alert("Object uploaded");
        firebase
          .storage()
          .ref("objects/" + imageId)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImgUrl(url);
          })
          .catch((error) => {
            alert("error");
          });
      });
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add or Remove Objects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: "1",
                justifyContent: "flex-end",
                alignItems: "center",
                margin: "15px 30px",
                marginTop: "-10px",
              }}
            >
              <Button variant="contained" onClick={handleClickOpen}>
                + Add Object
              </Button>
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: "50vh", width: "100%", maxWidth: "1200px" }}
            >
              <AgGridReact
                gridOptions={gridOptions}
                rowData={rowData}
              ></AgGridReact>
            </div>
          </div>

          <Dialog fullScreen open={open}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Add Key Project
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={(e) => saveDetails()}
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <Select
              margin="dense"
              style={{ margin: "10px", marginTop: "25px" }}
              displayEmpty={true}
              renderValue={() => {
                return type;
              }}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
              autoWidth
            >
              {typeList.map((type) => (
                <MenuItem value={type.name}>{type.name}</MenuItem>
              ))}
            </Select>
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Name"}
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Width"}
              variant="outlined"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Height"}
              variant="outlined"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Top"}
              variant="outlined"
              value={top}
              onChange={(e) => setTop(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Left"}
              variant="outlined"
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Image URL"}
              variant="outlined"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="ewc1--textInput"
            />
            <h3>Upload Image</h3>
            <img
              src={imgUrl}
              style={{
                width: "125px",
                height: "125px",
                margin: "5px",
                objectFit: "cover",
              }}
            />
            <input
              style={{
                justifySelf: "center",
              }}
              type="file"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </Dialog>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

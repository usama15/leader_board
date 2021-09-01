import React from 'react';
import fb from "../config/firebase";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Remove';
import RemoveIcon from '@material-ui/icons/Delete';


import './AddUser.css'
import firebase from "firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
      // width:'70%',
  },
    main:{
      width:'82%',
        marginLeft:'10%',
        marginTop:'3%',

    },

});

function ShowUser(props) {
      const classes = useStyles();
     const [post , setPost] = React.useState([])
     React.useEffect(() => {
      fb.firestore().collection('player').onSnapshot((snapshot) => {
          const newPost = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
          }))
          setPost(newPost)

      })
     },[])
    // console.log(post[0].id)
    function del(id){
         fb.firestore().collection("player").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
    }

    function inc(id){
         const docref = fb.firestore().collection("player").doc(id);
         docref.update({
             point: firebase.firestore.FieldValue.increment(+1)
         })


    }
     function dec(id){
         const docref = fb.firestore().collection("player").doc(id);
         docref.update({
             point: firebase.firestore.FieldValue.increment(-1)
         })


    }

    return (
        <div className={classes.main}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Running km</TableCell>
            <TableCell align="center">Type Run/Walk</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post.map((post) => (
            <TableRow  className={classes.row}>
              <TableCell component="th" scope="row">
                {post.name}
              </TableCell>
              <TableCell align="center">{post.run}</TableCell>
              <TableCell align="center">{post.type}</TableCell>
              <TableCell align="center">{post.date}</TableCell>
                <TableRow className={"cell1"}>
                    <TableCell>
                 <IconButton className={"btnplus"} aria-label="add">
                     <AddIcon  onClick={() => inc(post.id)}/>
                 </IconButton>
                        </TableCell>
                    <TableCell align={"center"}>{post.point}</TableCell>
                    <TableCell>
                    <IconButton className={"btnmin"} aria-label="delete">
                        <DeleteIcon  onClick={() => dec(post.id)} />
                    </IconButton>
                        </TableCell>
                     <TableCell>
                    <IconButton className={"btnmin"} aria-label="delete">
                        <RemoveIcon onClick={() => del(post.id)} />
                    </IconButton>
                        </TableCell>
                </TableRow>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
    );
}

export default ShowUser;
import React, { useEffect, useState } from "react";
import ListClasses from "../components/ListClasses";
import CreateClass from "../components/CreateClass";

/**
 * CS-5356
 * Show classes on the Instructor Home Page
 *
 * When this component loads for the first time,
 * load the users classes with a GET /api/classes.
 * Save it to the component state.
 *
 * Users can create new class codes, and classes from this page.
 * When a class code is generated or a new class is created,
 * reload and display the updated list of the user's classes.
 */
const InstructorHomePage = props => {
  const [classes, setClasses] = useState([]);
  useEffect(()=> {getClasses();}, []);

  const getClasses = () => {
    fetch('/api/classes', { method: 'GET' }).then(
      (res) => {
        if(res.ok){
          res.json().then((value)=>{
            console.log(value.classes);
            setClasses(value.classes);
          });
        }else{
          res.json().then( value => console.log(value));
          setClasses([]);
        }

      });
  }
  const onCodeGenerated = () => {
    // console.log('onCodeGenerated')
    getClasses();
  };

  const onClassCreated = () => {
    // console.log('onClassCreated')  
    getClasses();
  };

  return (
    <>
      <section>
        <div className="container">
          <ListClasses classes={classes} onCodeGenerated={onCodeGenerated} />
        </div>
      </section>
      <section>
        <div className="container">
          <CreateClass onClassCreated={onClassCreated} />
        </div>
      </section>
    </>
  );
};

export default InstructorHomePage;

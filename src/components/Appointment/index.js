import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// Define mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

    // Destructure mode, transition, and back from useVisualMode hook
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
  
    // Function to save appointment
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
  
      transition(SAVING);
  
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true));
    }
  
    // Function to delete appointment
    function destroy() {
      transition(DELETING, true);
      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(error => transition(ERROR_DELETE, true));
    }
  
    
    return (
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {/* Render Empty component if mode is EMPTY */}
        {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
        {/* Render Show component if mode is SHOW */}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {/* Render Form component if mode is CREATE */}
        {mode === CREATE && (
          <Form interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save} />
        )}
        {/* Render Form component for editing if mode is EDIT */}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {/* Render Status component if mode is SAVING or DELETING */}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {/* Render Confirm component if mode is CONFIRM */}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={back}
            onConfirm={destroy}
          />
        )}
        {/* Render Error component when mode is ERROR_SAVE or ERROR_DELETE */}
        {mode === ERROR_SAVE && 
        <Error message="Could not delete appointment" onClose={back} />}
        {mode === ERROR_DELETE && 
        <Error message="Could not save appointment" onClose={back} />}
      </article>
    );
  }
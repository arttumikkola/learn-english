import React from "react";
import AdminWordComponent from "./AdminWordComponent";
import "./AdminComponent.css";
//Admin view where you can add, update and delete words in the user table
function AdminComponent() {
  return (
    <div>
      <p>Here you can add and delete new words to learn.</p>
      <AdminWordComponent />
    </div>
  );
}

export default AdminComponent;

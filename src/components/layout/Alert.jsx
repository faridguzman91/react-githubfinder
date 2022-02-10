import React from "react";
import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AlertImg from "../../assets/alert-yellow.svg";

function Alert() {
  const { alert } = useContext(AlertContext);

  return alert !== null && (
      <p className="flex items-start m-4 space-x-2">
        {alert.type === "error" && (
        <img src={AlertImg} alt="alert" />
        )}
        <p className="flex-1 text-base font-semibold leading-7 text-white">
          <strong>{alert.msg}</strong>
        </p>
      </p>
    )
  
}

export default Alert;

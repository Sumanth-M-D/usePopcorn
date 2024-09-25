import { useEffect } from "react";

export function useKey(keyCode, action) {
  useEffect(
    function () {
      /// callback function for eventListner
      function callBack(e) {
        if (e.code.toLowerCase() === keyCode.toLowerCase()) action();
      }

      /// Attacheing eventListner
      document.addEventListener("keydown", callBack);

      /// Clean up the eventListner
      return () => {
        document.removeEventListener("keydown", callBack);
      };
    },
    [action]
  );
}

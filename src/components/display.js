import { useContext } from "react";

import { FormContext } from "../context";

export const Display = ({ populateDisplay, clearFormData }) => {
  const { formData, setFormData, displayItems, isViewing, setIsViewing } =
    useContext(FormContext);

  const editHandler = (entry) => {
    clearViewState();

    let entryCopy = {
      ...entry,
      phone1: entry.phoneNumber.slice(0, 4),
      phone2: entry.phoneNumber.slice(4, 7),
      phone3: entry.phoneNumber.slice(7),
    };

    delete entryCopy.phoneNumber;

    setFormData(entryCopy);
  };

  const deleteHandler = (entry) => {
    clearViewState();
    if (entry.id === formData.id) {
      clearFormData();
    }

    const deleteContent = async () => {
      let response = await fetch(
        `http://54.202.218.249:9501/api/users/${entry.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        populateDisplay();
      }
    };
    deleteContent();
  };

  const viewHandler = (entry) => {
    if (!isViewing.viewState || isViewing.id !== entry.id) {
      editHandler(entry);
      setIsViewing({
        id: entry.id,
        viewState: true,
      });
    } else {
      clearFormData();
      setIsViewing({ id: "", viewState: false });
    }
  };

  const clearViewState = () => {
    if (isViewing.viewState) {
      setIsViewing({ id: "", viewState: false });
    }
  };

  return (
    <div className="col-md-6 tabt">
      <table className="table">
        <tbody>
          <tr class="ztxt">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th class="center">Edit</th>
            <th class="center">Delete</th>
            <th class="center">View</th>
          </tr>
          {displayItems.map((tableEntry) => {
            return (
              <>
                <tr>
                  <td>
                    {tableEntry.firstName} {tableEntry.lastName}
                  </td>
                  <td>{tableEntry.email}</td>
                  <td>{tableEntry.phoneNumber}</td>
                  <td class="center">
                    <button
                      className="ed"
                      onClick={() => {
                        editHandler(tableEntry);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td class="center">
                    <button
                      onClick={() => {
                        deleteHandler(tableEntry);
                      }}
                      style={{ background: "#f00" }}
                      className="ed"
                    >
                      Delete
                    </button>
                  </td>
                  <td class="center">
                    <button
                      style={{ background: "#000" }}
                      className="ed"
                      onClick={() => {
                        viewHandler(tableEntry);
                      }}
                    >
                      {tableEntry.id !== isViewing.id ? "View" : "Undo"}
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

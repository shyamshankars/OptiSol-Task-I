import { useContext, useEffect, useRef, useState } from "react";

import "../App.css";

import { Display } from "./display";
import { FormContext } from "../context";

export default function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formData, setFormData, displayItems, setDisplayItems, isViewing } =
    useContext(FormContext);
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  useEffect(() => {
    let dataPoster = async () => {
      if (
        isSubmitted === true &&
        formData.hasOwnProperty("phoneNumber") &&
        formData.id
      ) {
        await fetch("http://54.202.218.249:9501/api/users", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        clearFormData();
      }
    };
    getContent();
    dataPoster();
  }, [isSubmitted]);

  const handleInputChange = (e, phoneRef) => {
    const { name, value } = e.target;
    let inputValue = value;

    if (name === "firstName" || name === "lastName") {
      inputValue = value.replace(/[0-9]/g, "");
    }

    if (
      name === "phone1" ||
      name === "phone2" ||
      name === "phone3" ||
      name === "zipCode"
    ) {
      inputValue = value.replace(/[^0-9]/g, "");
    }

    if (
      (name === "phone1" && value.length === 4) ||
      (name === "phone2" && value.length === 3)
    ) {
      phoneRef.current.focus();
    }

    setFormData((formData) => {
      return { ...formData, [name]: inputValue };
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (
      formData.hasOwnProperty("phone1") &&
      formData.hasOwnProperty("phone2") &&
      formData.hasOwnProperty("phone3")
    ) {
      let phoneNumber = formData.phone1 + formData.phone2 + formData.phone3;

      let formDataCopy = {
        ...formData,
        id: formData.id || generateId(),
        phoneNumber: phoneNumber,
      };

      delete formDataCopy.phone1;
      delete formDataCopy.phone2;
      delete formDataCopy.phone3;

      setFormData(formDataCopy);
    }
  };

  const generateId = () => {
    let id = Math.random(0, 10000);
    displayItems.forEach((item) => {
      if (item.id === id) {
        id = Math.random(0, 10000);
      }
    });
    return id;
  };

  const getContent = async () => {
    let response = await fetch("http://54.202.218.249:9501/api/users");

    if (!response.ok) {
      throw new Error("Errored out while fetching list");
    }

    let responseData = await response.json();
    setDisplayItems(responseData);
  };

  const clearFormData = () => {
    let formDataCopy = { ...formData, phone1: "", phone2: "", phone3: "" };
    delete formDataCopy.phoneNumber;

    for (let key in formDataCopy) {
      formDataCopy[key] = "";
    }

    setIsSubmitted(false);
    setFormData(formDataCopy);
  };

  return (
    <div className="container">
      <div className="register col-md-5 col-sm-6">
        <h1 className="title">Bio Data</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="clearfix"></div>
          <div className="form-group">
            <label className="reg_txt">
              Name <span>*</span>
            </label>
            <div className="controls form-inline">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input-name"
                placeholder="First"
                readOnly={isViewing.viewState}
                required
                maxLength={20}
              ></input>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input-name"
                placeholder="Last"
                readOnly={isViewing.viewState}
                required
                maxLength={20}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="reg_txt">
              Email <span>*</span>
            </label>
            <div className="controls form-inline">
              <input
                name="email"
                value={formData.email}
                type="email"
                className="form-register text"
                placeholder="Email"
                onChange={handleInputChange}
                readOnly={isViewing.viewState}
                required
                maxLength={30}
              ></input>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="form-group">
            <label className="reg_txt">
              Phone number <span>*</span>
            </label>
            <div className="clearfix"></div>
            <div className="wsite-form">
              <input
                type="text"
                name="phone1"
                value={formData.phone1}
                minLength={4}
                maxLength={4}
                onChange={(e) => handleInputChange(e, phone2Ref)}
                className="text input-name1"
                readOnly={isViewing.viewState}
                required
              />
            </div>
            <div className="line">-</div>
            <div className="wsite-form">
              <input
                type="text"
                className="text input-name1"
                name="phone2"
                minLength={3}
                maxLength={3}
                value={formData.phone2}
                ref={phone2Ref}
                onChange={(e) => handleInputChange(e, phone3Ref)}
                readOnly={isViewing.viewState}
                required
              />
            </div>
            <div className="line">-</div>
            <div className="wsite-form">
              <input
                type="text"
                className="text input-name1"
                name="phone3"
                minLength={3}
                maxLength={3}
                value={formData.phone3}
                ref={phone3Ref}
                onChange={handleInputChange}
                readOnly={isViewing.viewState}
                required
              />
            </div>
          </div>
          <div class="clearfix"></div>

          <div className="form-group">
            <label
              className="reg_txt"
              style={{
                marginTop: "15px",
              }}
            >
              Address <span>*</span>
            </label>
            <input
              type="text"
              className="form-register text"
              id=""
              placeholder="Line 1"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              readOnly={isViewing.viewState}
              required
              maxLength={65}
              style={{
                marginBottom: "15px",
              }}
            />
            <input
              type="text"
              className="form-register text"
              id=""
              placeholder="Line 2"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              readOnly={isViewing.viewState}
              required
              maxLength={65}
            />
          </div>

          <div className="form-group">
            <div className="controls form-inline">
              <input
                type="text"
                className="input-name"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                readOnly={isViewing.viewState}
                required
                maxLength={20}
              />
              <input
                type="text"
                className="input-name"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                readOnly={isViewing.viewState}
                required
                maxLength={20}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="controls form-inline">
              <input
                type="text"
                className="input-name"
                placeholder="Zipcode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                readOnly={isViewing.viewState}
                required
                minLength={6}
                maxLength={6}
              />
              <input
                type="text"
                className="input-name"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                readOnly={isViewing.viewState}
                required
                maxLength={20}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="reg_txt">
              Write Your qualification <span>*</span>
            </label>
            <input
              type="text"
              className="form-register text"
              placeholder="Add your qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              readOnly={isViewing.viewState}
              required
            />
            <span>
              <img alt="" src="images/plus.png" className="add" />
            </span>
          </div>
          <div className="form-group">
            <label className="reg_txt">
              Comment <span>*</span>
            </label>
            <textarea
              name="comments"
              onChange={handleInputChange}
              className="form-register text"
              value={formData["comments"]}
              readOnly={isViewing.viewState}
              required
            ></textarea>
          </div>
          <button
            className="btn btn-default submit"
            type="submit"
            disabled={isViewing.viewState}
            style={{
              width: "97.5%",
              marginBottom: "15px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <Display populateDisplay={getContent} clearFormData={clearFormData} />
    </div>
  );
}

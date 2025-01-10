import React, { useState, useEffect } from 'react';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import flatpickr from "flatpickr";
import MapComponent from './MapComponent';
import ImageUploader from './DropImage';
import "flatpickr/dist/flatpickr.min.css";
import './NewObject.css';
import Objects from '../Objects/Objects';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Success!</h3>
                <p>Your object was successfuly added.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
const NewObject = () => {

    const optionsForPage1 = countryList().getData();
    const optionsForPage2 = [
        { value: 'parking', label: 'Parking', category: '' },
        { value: 'eat', label: 'Eat', category: '' },
        { value: 'transfer', label: 'Transfer', category: 'Hotel' },
        { value: 'balcon', label: 'Balcon', category: 'Flat' },
        { value: 'pool', label: 'Pool', category: 'House' },
        { value: 'garage', label: 'Garage', category: 'House' },
    ];
    const requiredFields = [
        'listingType',
        'name',
        'country',
        'city',
        'street',
        'streetNumber',
        'postalCode',
    ];
    const inputFields = {
        House: [
            { label: "Max People Capacity *", placeholder: "Max People Capacity", name: 'maxCapacity' },
            { label: "Toilet Count *", placeholder: "Toilet Count", name: 'toiletCount' },
            { label: "Price per day *", placeholder: "Price per day", name: 'price' },
            { label: "Parking Info *", placeholder: "Parking Info", name: 'parking' },
            { label: "Floor *", placeholder: "Floor", name: 'floor' },
            { label: "Total Square *", placeholder: "Total Square", name: 'square' },
            { label: "Room Count *", placeholder: "Room Count", name: 'roomCount' },
            { label: "How To Get Key *", placeholder: "How To Get Key", name: 'GetKey' },
            { label: "Float Count *", placeholder: "Float Count", name: 'floatCount' },

        ],
        Flat: [
            { label: "Max People Capacity *", placeholder: "Max People Capacity", name: 'maxCapacity' },
            { label: "Toilet Count *", placeholder: "Toilet Count", name: 'toiletCount' },
            { label: "Price per day *", placeholder: "Price per day", name: 'price' },
            { label: "Parking Info *", placeholder: "Parking Info", name: 'parking' },
            { label: "Floor *", placeholder: "Floor", name: 'floor' },
            { label: "Total Square *", placeholder: "Total Square", name: 'square' },
            { label: "Room Count *", placeholder: "Room Count", name: 'roomCount' },
            { label: "How To Get Key *", placeholder: "How To Get Key", name: 'GetKey' },
            { label: "Flat Number *", placeholder: "Flat Number", name: 'flatNumber' },
            { label: "Door Code *", placeholder: "Door Code", name: 'doorCode' },

        ],
        Hotel: [
            { label: "Max People Capacity *", placeholder: "Max People Capacity", name: 'maxCapacity' },
            { label: "Toilet Count *", placeholder: "Toilet Count", name: 'toiletCount' },
            { label: "Price per day *", placeholder: "Price per day", name: 'price' },
            { label: "Parking Info *", placeholder: "Parking Info", name: 'parking' },
            { label: "Floor *", placeholder: "Floor", name: 'floor' },
            { label: "Total Square *", placeholder: "Total Square", name: 'square' },
            { label: "Room Count *", placeholder: "Room Count", name: 'roomCount' },
            { label: "Room Number *", placeholder: "Room Number", name: 'roomNumber' },
            { label: "Room Type *", placeholder: "Room Type", name: 'roomType' },

        ],
        Hostel:
            [
                { label: "Max People Capacity *", placeholder: "Max People Capacity", name: 'maxCapacity' },
                { label: "Toilet Count *", placeholder: "Toilet Count", name: 'toiletCount' },
                { label: "Price per day *", placeholder: "Price per day", name: 'price' },
                { label: "Parking Info *", placeholder: "Parking Info", name: 'parking' },
                { label: "Floor *", placeholder: "Floor", name: 'floor' },
                { label: "Total Square *", placeholder: "Total Square", name: 'square' },
                { label: "Room Count *", placeholder: "Room Count", name: 'roomCount' },
                { label: "Room Number *", placeholder: "Room Number", name: 'roomNumber' },
                { label: "Fow Who *", placeholder: "For Who", name: 'forWho' },
                { label: "People In Room *", placeholder: "People In Room", name: 'peopleInRoom' },

            ]
    };
    const [number, setNumber] = useState(3);
    const [formData, setFormData] = useState({});
    const [images, setImages] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [forms, setForms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate()
    const handleDateChange = (value, index) => {
        const formatLocalDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const [startDate, endDate] = value;

        const updatedBook = [...(formData.book || [])];
        updatedBook[index] = {
            dateIn: startDate ? formatLocalDate(startDate) : "",
            dateOut: endDate ? formatLocalDate(endDate) : "",
        };

        setFormData((prev) => ({
            ...prev,
            book: updatedBook,
        }));
    };


    useEffect(() => {
        if (forms.length > 0) {
            forms.forEach((_, index) => {
                flatpickr(`#date-range-${index}`, {
                    mode: "range",
                    dateFormat: "Y-m-d",
                    minDate: new Date().toISOString().split("T")[0],
                    onChange: (selectedDates) => {
                        handleDateChange(selectedDates, index);
                    },
                });
            });
        }
    }, [forms]);


    const addNewForm = () => {
        setFormData((prevData) => {
            const updatedBook = prevData.book ? [...prevData.book] : [];
            updatedBook.push({ dateIn: "", dateOut: "" });
            return {
                ...prevData,
                book: updatedBook,
            };
        });
        setForms((prevForms) => [...prevForms, prevForms.length + 1]);
    };



    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleChangeAmenities = (field, value) => {
        const values = Array.isArray(value)
            ? value.map(item => item.value)
            : JSON.parse(value).map(item => item.value);

        setSelectedAmenities(values);

        setFormData((prev) => ({
            ...prev,
            [field]: values,
        }));
        console.log(selectedAmenities, values)
    };

    const handleImageUpload = (files) => {
        const updatedImages = files.map((file) => {
            if (file instanceof File) {
                return {
                    file,
                    preview: URL.createObjectURL(file),
                    name: file.name,
                };
            }
            return file;
        });

        setImages(updatedImages);

        const data = new FormData();
        updatedImages.forEach((image, index) => {
            data.append(`image_${index}`, image.file);
        });

        handleChange("image", updatedImages);
    };

    const isFormValid = () => {

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
                data.append(key, value.toString());
            }
            else if (typeof value === "object") {
                data.append(key, JSON.stringify(value));
            }
        });



        const invalidFields = requiredFields.filter((field) => {
            const value = formData[field];

            if (typeof value === 'string' || typeof value === 'number') {
                return value.toString().trim() === '';
            }

            if (value instanceof File) {
                return value.size === 0;
            }

            if (Array.isArray(value)) {
                return value.length === 0 || !value.every((file) => file instanceof File && file.size > 0);
            }

            return value === undefined || value === null;
        });

        if (invalidFields.length > 0) {
            console.log('Validation failed. Missing fields:', invalidFields);
            return false;
        }

        console.log('FormData:', [...data.entries()]);
        return true;
    };


    const submitNextPage = (value) => {
        if (value == "next") {
            if (isFormValid()) {
                console.log("Данные отправлены", formData);
                setNumber(4);
            } else {
                console.log("Validation failed. Missing fields:", requiredFields.filter(
                    field => !formData[field] || formData[field].toString().trim() === ''
                ));
                alert("Please fill in all required fields.");
            }
        }
        else if (value == "proceed") {
            if (isInputValid()) {
                console.log("Данные отправлены", formData);
                setNumber(52);
            } else {
                console.log("Validation failed. Missing fields:", requiredFields2.filter(
                    field => !formData[field] || formData[field].toString().trim() === ''
                ));
                alert("Please fill in all required fields.");
            }
        }
    }
    const getSasUrl = async (blobName) => {
        try {
            const response = await fetch(`https://localhost:7152/api/objects/generate-sas-url?blobName=${blobName}`);
            const data = await response.json();

            if (response.ok) {
                return data.sasUrl;
            } else {
                console.error("Ошибка при получении SAS URL:", data.message);
                return null;
            }
        } catch (error) {
            console.error("Ошибка при вызове API:", error);
        }
    };
    const sendObjectHandler = async () => {
        const response = await fetch("https://localhost:7152/api/user/me", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Failed to fetch user data");
            return;
        }

        const userData = await response.json();
        formData.ownerId = userData.id
        const uploadImagesToAzure = async (images) => {
            const uploadedUrls = [];

            for (const image of images) {
                const file = image.file || image; // Извлечение файла из объекта
                const blobName = `${Date.now()}-${file.name}`;

                // Получаем SAS URL с бэкенда
                const sasUrl = await getSasUrl(encodeURIComponent(blobName));
                if (!sasUrl) {
                    console.error("Не удалось получить SAS URL для файла", file.name);
                    continue;
                }

                try {
                    const response = await fetch(sasUrl, {
                        method: "PUT",
                        headers: {
                            "x-ms-blob-type": "BlockBlob",
                        },
                        body: file,
                    });

                    if (response.ok) {
                        uploadedUrls.push(sasUrl.split("?")[0]);
                    } else {
                        console.error("Ошибка при загрузке файла на Azure", file.name);
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке файла:", file.name, error);
                }
            }

            return uploadedUrls;
        };

        const images = formData?.image;
        const uploadedImageUrls = await uploadImagesToAzure(images);
        formData.imageUrls = uploadedImageUrls;
        console.log(formData)
        fetch('https://localhost:7152/api/objects/add', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            if(response.ok){
                setModalVisible(true); 
                navigate('/')
            }

        console.log(formData);
        return;
    }
    const filteredAmenities = formData.listingType
        ? optionsForPage2.filter(
            (option) => option.category === formData.listingType || option.category === ''
        )
        : optionsForPage2;

    const getFieldsForCategory = () => {
        if (formData.listingType && inputFields[formData.listingType]) {
            return inputFields[formData.listingType];
        }
        return [];
    };
    const requiredFields2 = [
        'description',
        'amenities',
        ...getFieldsForCategory().map(field => field.name),
    ]
    const isInputValid = () => {
        return requiredFields2.every(field => {
            const value = formData[field];
            return value !== undefined && value !== null && value.toString().trim() !== '';
        });
    }

    return (
        <div className="main-container-add">
             {modalVisible && <SuccessModal onClose={() => setModalVisible(false)} />}
            <div className="header-add">
                <h2 className="header-add">Add New Listing</h2>
            </div>
            <div className="small-text-add">
                On this page you can list your own property available for rent
            </div>
            <div className="buttons-container-add">
                <div className="button1-add">
                    <button className="button-add" onClick={() => setNumber(3)}>
                        1
                    </button>
                    <div className="info-add">Basic Information</div>
                </div>
                <hr className="hr-add" />
                <div className="button1-add">
                    <button className="button-add" onClick={() => submitNextPage("next")}>
                        2
                    </button>
                    <div className="info-add">Detailed Information</div>
                </div>
                <hr className="hr-add" />
                <div className="button1-add">
                    <button className="button-add" onClick={() => submitNextPage("proceed")}>3</button>
                    <div className="info-add">Preview</div>
                </div>
            </div>

            {number === 3 && (
                <div className="main-form-add">
                    <h2 className="header-form-add">Basic Information</h2>
                    <div className="form-add">
                        <h2 className="form-info-add">Choose Listing Category</h2>
                        <div className="select-input-add">
                            <div className="text-input-add">Choose listing type *</div>
                            <select
                                onChange={(e) =>
                                    handleChange('listingType', e.target.value)}
                                className="select-add"
                                value={formData.listingType || ""}
                            >
                                <option value="">Select type...</option>
                                <option value="House">House</option>
                                <option value="Flat">Flat</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Hostel">Hostel</option>

                            </select>

                            <div className="text-input-add">Listing name *</div>
                            <input type="text" className="input-add" placeholder="Listing Name" value={formData.name || ""} onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-location-add">
                        <h2 className="form-info-add">Listing Location</h2>
                        <div className="line1-add">
                            <div className="block-add">
                                <div className="text-input-add">Country *</div>
                                <Select
                                    options={optionsForPage1}
                                    placeholder="Select a country"
                                    className="input-select-add"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: '10px',
                                        }),
                                    }}
                                    onChange={(selectedOption) => handleChange('country', selectedOption.label)}
                                    value={optionsForPage1.find(option => option.label === formData.country) || null}
                                />
                            </div>
                            <div className="block-add">
                                <div className="text-input-add">City *</div>
                                <input type="text" className="input-line1-add" placeholder="Enter city" value={formData.city || ""} onChange={(e) => handleChange('city', e.target.value)} id='input'
                                />
                            </div>
                        </div>
                        <div className="line1">
                            <div className="text-input-add">Street *</div>
                            <input type="text" className="input-line1-add" placeholder="Enter street" value={formData.street || ""} onChange={(e) => handleChange('street', e.target.value)} id='input' />
                        </div>
                        <div className="line1-add">
                            <div className="block-add">
                                <div className="text-input-add">Object number *</div>
                                <input type="text" className="input-line1-add" placeholder="Add object street number" value={formData.streetNumber || ""} onChange={(e) => handleChange('streetNumber', e.target.value)} id='input' />
                            </div>
                            <div className="block-add">
                                <div className="text-input-add">PostalCode *</div>
                                <input type="text" className="input-line1-add" placeholder="Add postal code number" value={formData.postalCode || ""} onChange={(e) => handleChange('postalCode', e.target.value)} id='input' />
                            </div>
                        </div>
                        <div className="map-form-add">
                            <MapComponent
                                latitude={40.748817}
                                longitude={-73.985428}
                                zoom={15}
                                placeName="Empire State Building"
                                className="maps-add"
                            />
                        </div>
                    </div>

                    <div className="upload-image-add">
                        <h2 className="form-info-add">Upload Images</h2>
                        <ImageUploader onFilesChange={handleImageUpload}
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                            {images.map((file, index) => (
                                <div key={index} style={{ marginRight: '10px', textAlign: 'center' }}>
                                    <img
                                        src={file.preview}
                                        alt="Preview"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <p style={{ fontSize: '12px' }}>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {number === 4 && (
                <>
                    <div className="container-description-add">
                        <h2 className="form-info-add">Detailed Information</h2>
                        <div className="text-input-add">Select amenities *</div>
                        <Select
                            options={filteredAmenities}
                            placeholder="Select amenities"
                            className="input-select-add"
                            isMulti
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    borderRadius: '10px',
                                }),
                            }}
                            value={selectedAmenities.map((value) =>
                                filteredAmenities.find((option) => option.value === value)
                            )}
                            onChange={(e) => handleChangeAmenities('amenities', e)}
                            id='input'
                        />
                        <div className="description-add">
                            <div className="text-input-add">Description *</div>
                            <textarea className="input-add textarea-add" placeholder="Description" value={formData?.description || ""} onChange={(e) => handleChange('description', e.target.value)} id='input'  ></textarea>
                        </div>
                    </div>
                    <div className="container-about-add">
                        <h2 className="form-info-add">Size Of Your Listing</h2>
                        <div className="main-container">
                            {getFieldsForCategory().map((field, index) => (
                                <div className="object-and-input-add" key={index}>
                                    <div className="text-input-add">{field?.label}</div>
                                    <input
                                        type="text"
                                        className="input-add"
                                        placeholder={field?.placeholder}
                                        value={formData[field?.name] || ""}
                                        onChange={(e) => handleChange(field.name, e.target.value)}

                                    />
                                </div>
                            ))}
                        </div>
                        <h2 className="form-info-add">Availabilities</h2>
                        <a onClick={addNewForm} className="add-guest-button">
                            + Add New Dates
                        </a>

                        <div className="new-availabilities-add">

                            {forms.length > 0 && forms.map((_, index) => (

                                <div className="input-new-add" key={index}>
                                    <div className="text-input-add">Availabilities *</div>
                                    <input
                                        type="text"
                                        className="find-date input-style input-style-add"
                                        id={`date-range-${index}`}
                                        value={
                                            formData.book?.[index]
                                                ? `${formData.book[index].dateIn ? formData.book[index].dateIn + " to " : ""}${formData.book[index].dateOut || ""}`
                                                : ""

                                        }
                                    />
                                </div>
                            ))}


                        </div>
                    </div>
                </>
            )}
            {number === 52 && (
                <div className="main-cont">
                    <Objects formData={formData} />
                    <div className="button-object-add">
                        <button className='object-add' onClick={sendObjectHandler}>Add</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewObject; 
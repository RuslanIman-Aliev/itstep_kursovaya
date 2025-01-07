import React, { useState } from 'react';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import './NewObject.css';
import MapComponent from './MapComponent';
import ImageUploader from './DropImage';

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
    const inputFields = {
        House: [
            { label: "Max People Capacity *", placeholder: "Max People Capacity", name: 'maxCapacity' },
            { label: "Toilet Count *", placeholder: "Toilet Count", name: 'toiletCount' },
            { label: "Price per day *", placeholder: "Price per day", name: 'price' },
            { label: "Parking Info *", placeholder: "Parking Info", name: 'parking' },
            { label: "Floor *", placeholder: "Floor", name: 'floor' },
            { label: "Total Square *", placeholder: "Total Square", name: 'square' },
            { label: "Room Count *", placeholder: "Room Count", name: 'roomCount' },
            { label: "How To Get Key *", placeholder: "How To Get Key", name: 'key' },
        ],
        Flat: [
            { label: "Max People Capacity *", placeholder: "Max People Capacity", name: 'maxCapacity' },
            { label: "Toilet Count *", placeholder: "Toilet Count", name: 'toiletCount' },
            { label: "Price per day *", placeholder: "Price per day", name: 'price' },
            { label: "Parking Info *", placeholder: "Parking Info", name: 'parking' },
            { label: "Floor *", placeholder: "Floor", name: 'floor' },
            { label: "Total Square *", placeholder: "Total Square", name: 'square' },
            { label: "Room Count *", placeholder: "Room Count", name: 'roomCount' },
            { label: "How To Get Key *", placeholder: "How To Get Key", name: 'key' },
            { label: "Flat Number *", placeholder: "Flat Number", name: 'flatNumber' },

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
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleChangeAmenities = (field, value) => {
        const values = Array.isArray(value)
        ? value.map(item => item.value)  // Если это массив объектов
        : JSON.parse(value).map(item => item.value); // Если это строка JSON

    // Сохраняем выбранные значения в состоянии
    setSelectedAmenities(values);

    // Обновляем formData
    setFormData((prev) => ({
        ...prev,
        [field]: values,
    }));
        console.log(selectedAmenities,values)
    };
    
    const handleImageUpload = (files) => {
        setImages(files);
    };
    const submitNextPage = () =>{

   
   
    
    // if (!input.empty()) {
        // Отправить данные, если форма заполнена
        console.log("Данные отправлены", formData);
        setNumber(4)
    // } else {
    //     console.log("Заполните все обязательные поля");
    // }
}
    const handleSubmit = () => {
        const data = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        images.forEach((image, index) => {
            data.append(`image_${index}`, image);
        });

        console.log([...data.entries()]);
    };
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

    return (
        <div className="main-container-add">
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
                    <button className="button-add" onClick={submitNextPage}>
                        2
                    </button>
                    <div className="info-add">Detailed Information</div>
                </div>
                <hr className="hr-add" />
                <div className="button1-add">
                    <button className="button-add">3</button>
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
                                onChange={(e) => handleChange('listingType', e.target.value)}
                                required
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
                            <input type="text"  className="input-add" placeholder="Listing Name" value={formData.listingName || ""}  onChange={(e) => handleChange('listingName', e.target.value)} 
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
                                    onChange={(e) => handleChange('country', e)}
                                    value={formData.country || ""}
                                    id='input'
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
                                <input type="text" className="input-line1-add" placeholder="Add object street number" value={formData.streetNumber|| ""} onChange={(e) => handleChange('streetNumber', e.target.value)} id='input' />
                            </div>
                            <div className="block-add">
                                <div className="text-input-add">PostalCode *</div>
                                <input type="text" className="input-line1-add" placeholder="Add postal code number"  value={formData.postalCode || ""} onChange={(e) => handleChange('postalCode', e.target.value)} id='input' />
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
                            <textarea className="input-add textarea-add" placeholder="Description" value={formData?.description || ""}  onChange={(e) => handleChange('description', e.target.value)} id='input'  ></textarea>
                        </div>
                    </div>
                    <div className="container-about-add">
                        <h2 className="form-info-add">Size Of Your Listing</h2>
                        <div className="main-container">
                            {getFieldsForCategory().map((field, index) => (
                                <div className="object-and-input-add" key={index}>
                                    <div className="text-input-add">{field.label}</div>
                                    <input
                                        type="text"
                                        className="input-add"
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || ""}
                                        onChange={(e) => handleChange(field.name, e.target.value)} 
                                        id='input'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            <button onClick={handleSubmit}>fsfsfdsfd</button>
        </div>
    );
};

export default NewObject;
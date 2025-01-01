import React, { useState } from 'react';
 import { Cell } from 'ton';  
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { FaHotel } from "react-icons/fa6";
import { BsGeoAlt } from "react-icons/bs";
import { MdOutlineAccessAlarm } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { IoPeople } from "react-icons/io5";

import './ConfirmBooking.css'
import RatingStars from "../../layouts/Ratings/RatingStars";

const ConfirmBookings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [forms, setForms] = useState([1]);
    const [errorMessage, setErrorMessage] = useState(null);  
    const [transactionStatus, setTransactionStatus] = useState(null); 
    const navigate = useNavigate(); 
    const [tonConnectUI] = useTonConnectUI();

    const addNewForm = () => {
        setForms([...forms, forms.length + 1]);
    };
    const transaction = {
        validUntil: Date.now() + 5 * 60 * 1000,  
        messages: [
          {
            address: 'UQB-eaopqBjwEDhJ2yV9lIXRa1Ml2UQYFS8Uuu4dloFSbot-',  
            amount: '5000000',  
          },
        ],
      };
      const submitHandler = async () => {
        setIsLoading(true);
        setTransactionStatus(null);

        try {
            toast.info('Отправка транзакции. Пожалуйста, подождите...');
            const result = await tonConnectUI.sendTransaction(transaction);
            console.log('Transaction result:', result);

            if (!result.boc) {
                throw new Error('BOC отсутствует в ответе');
            }

            toast.info('Транзакция отправлена. Проверяем статус...');
            const decodedHash = await decodeBOC(result.boc);
            await periodicallyCheckTransactionStatus(decodedHash);
        } catch (error) {
            console.error('Transaction error:', error);
            setTransactionStatus('Transaction failed');
            toast.error(`Ошибка: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const decodeBOC = async (boc) => {
        try {
             const cell = Cell.fromBoc(Buffer.from(boc, 'base64'))[0];  
             const txHash = cell.hash().toString('hex');  
            console.log('Decoded Transaction Hash:', txHash);
            return "txHash";
        } catch (error) {
            console.error('Error decoding BOC:', error);
            throw new Error('Не удалось декодировать BOC');
        }
    };

    const checkTransactionStatus = async (txHash) => {
        const apiUrl = `https://toncenter.com/api/v2/getTransaction`; // Замените на нужный API
        const params = { hash: txHash };

        try {
            const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
            const data = await response.json();

            if (!response.ok || data.error) {
                console.error('Transaction check error:', data);
                throw new Error(data.error?.message || 'Failed to fetch transaction status');
            }

            return data.result?.status === 'confirmed' ? 'success' : 'failed';
        } catch (error) {
            console.error('Error checking transaction status:', error);
            throw error;
        }
    };

    const periodicallyCheckTransactionStatus = async (txHash) => {
        const maxAttempts = 10; // Максимум 10 попыток
        const interval = 5000; // Интервал в 5 секунд

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const status = await checkTransactionStatus(txHash);

                if (status === 'success') {
                    setTransactionStatus('Transaction successful');
                    toast.success('Транзакция успешно завершена!');
                    return;
                }

                toast.info(`Попытка ${attempt}: статус пока не подтвержден`);
            } catch (error) {
                console.error('Error checking transaction status:', error);
                toast.error(`Ошибка при проверке: ${error.message}`);
            }

            await new Promise((resolve) => setTimeout(resolve, interval));
        }

        setTransactionStatus('Transaction failed');
        toast.error('Транзакция не выполнена после нескольких попыток.');
    };
    return (
        <div className="container-confirm">
{isLoading && (
                <div className="loading-overlay">
                    <div className="loading-message">Подождите, обрабатываем транзакцию...</div>
                </div>
            )}
            <div className="header-confirm">
                <h3 className="text-header-confirm">Review your Booking</h3>
                <div className="image-header-confirm"></div>
            </div>

            <div className="main-container-confirm">
                <div className="part1-container-confirm">
                    <div className="object-container-confirm">
                        <h3 className="object-info-confirm"><FaHotel className="object-icon-confirm" /> Object Information </h3>
                        <div className="main-object-confirm">
                            <div className="image-part-confirm"></div>
                            <div className="info-part-confirm">
                                <div className="name-object-confirm">Pride moon Village Resort & Spa</div>
                                <div className="icon-address-info-list"><BsGeoAlt className="geo-icon-list" /> 5855 W Century Blvd, Los Angeles - 90045</div>
                                <div className="rating-object-confirm"><RatingStars rating={4.5} /><span className="text-stars-confirm"> 4.5/5.0 </span></div>
                            </div>
                        </div>
                        <div className="about-object-confirm">
                            <div className="block-object-confirm">
                                <div className="checkIn-object-confim">Check-in</div>
                                <div className="date-object-confim">4 March 2022</div>
                                <div className="icon-and-desc-confirm">
                                    <MdOutlineAccessAlarm className="icon-object-confirm" />
                                    <div className="time-object-confim">12:30 pm</div>
                                </div>
                            </div>
                            <div className="block-object-confirm">
                                <div className="checkOut-object-confim">Check out</div>
                                <div className="date-object-confim">8 March 2022</div>
                                <div className="icon-and-desc-confirm">
                                    <MdOutlineAccessAlarm className="icon-object-confirm" />
                                    <div className="time-object-confim">4:30 pm</div>
                                </div>
                            </div>
                            <div className="block-object-confirm">
                                <div className="guests-object-confim">Guests</div>
                                <div className="count-object-confim">2 Guests</div>
                                <div className="icon-and-desc-confirm">
                                    <GoSun className="icon-object-confirm" />
                                    <div className="nights-object-confim"> 3 Nights - 4 Days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="guests-container-confirm">
                        <h3 className="object-info-confirm "><IoPeople id="people" className="people-icon-confirm " /> Guest Details </h3>
                        <div className="main-guest-confirm">Main Guest</div>
                        
                        {forms.map((form, index) => (
                            <div key={index} className="mini-form">
                                <div className="label-and-input-confirm">
                                    <label className="guest-label">Title</label>
                                    <select className="select-input">
                                        <option value="">Select Title</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Dr">Dr</option>
                                    </select>
                                </div>
                                <div className="label-and-input-confirm">
                                    <label className="guest-label">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="guest-input"
                                    />
                                </div>
                                <div className="label-and-input-confirm">

                                    <label className="guest-label">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="guest-input"
                                    />
                                </div>

                            </div>
                        ))}



                        <a onClick={addNewForm} className="add-guest-button">
                            + Add New Guest
                        </a>
                    </div>
                </div>

                <div className="transaction-status">
    {transactionStatus && <p>{transactionStatus}</p>}
</div>


                <div className="part2-container-confirm">
                    <div className="price-container-confirm">
                        <div className="header-price-confirm">Price Summary</div>
                        <div className="block-price-confirm">
                            <div className="object-charges-price-confirm">Object Charges</div>
                            <div className="sum-price-confirm">$2200</div>

                        </div>
                        <div className="block-price-confirm">
                            <div className="object-charges-price-confirm">Taxes 1.5% Fees</div>
                            <div className="sum-price-confirm">$2</div>
                        </div>
                        <div className="total-amount-price-confirm">
                            <div className="pay-block-price-confirm">
                                <div className="pay-object-charges-price-confirm">Payable Now</div>
                                <div className="pay-sum-price-confirm">$22,500</div>
                            </div>
                        </div>
                        <div className="button-proceed-confirm">
                        <button onClick={submitHandler} disabled={isLoading}>
                {isLoading ? 'Обработка...' : 'Отправить транзакцию'}
            </button>
            {transactionStatus && <p>{transactionStatus}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default ConfirmBookings
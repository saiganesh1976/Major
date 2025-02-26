import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MonthlyDistributions.css';
import { Context } from '../../Context/Context';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const MonthlyDistributions = () => {
  const { t, i18n } = useTranslation();
  const {url}=useContext(Context);

  const [distributionDates, setDistributionDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slot, setSlot] = useState('');
  const [rationCardNumber, setRationCardNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDistributionDates = async () => {
      try {
        const { data } = await axios.get(`${url}/api/bookings/dates`);
        setDistributionDates(data.map(date => new Date(date)));
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    const fetchAvailableSlots = async () => {
      try {
        const { data } = await axios.get(`${url}/api/bookings/slots`);
        setAvailableSlots(data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchDistributionDates();
    fetchAvailableSlots();
  }, []);

  const isDistributionDate = (date) => {
    return distributionDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const handleDateChange = (date) => {
    if (isDistributionDate(date)) {
      setSelectedDate(date);
      setMessage("");
    } else {
      setMessage(`{t("select_valid_date")}`);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedDate || !slot || !rationCardNumber || !mobileNumber) {
      setMessage(`{t("fill_all_fields")}`);
      toast.error(`{t("fill_all_fields")}`)
      return;
    }

    const bookingData = {
      date: selectedDate.toISOString(),
      slot,
      rationCardNumber,
      mobileNumber,
    };

    try {
      const { data } = await axios.post(`${url}/api/bookings/book`, bookingData);
      setMessage("Slot booked successfully!");
      toast.success("Slot booked successfully!")
    } catch (error) {
      console.error("Error booking slot:", error);
      setMessage(`{t("slot_booking_failed")}`);
      toast.error(`{t("slot_booking_failed")}`)
    }
  };

  return (
    <div className="monthly-distributions">
      <h1>{t("title-slots")}</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) =>
          isDistributionDate(date) ? "distributed-date" : null
        }
      />
      {selectedDate && (
        <div className="booking-form">
          <h2>Book a Slot for <span>{selectedDate.toDateString()}</span></h2>
          <label> {t("select_time_slot")}
            <select value={slot} onChange={(e) => setSlot(e.target.value)}>
              <option value="">{t("select")}</option>
              {availableSlots.map((s, index) => (
                <option key={index} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <br />
          <label> {t("rationCardNo")}
            <input
              type="text"
              value={rationCardNumber}
              onChange={(e) => setRationCardNumber(e.target.value)}
              placeholder={t("enter_ration_card_number")}
            />
          </label>
          <br />
          <label>{t("mobile_number")}
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder={t("enter_mobile_number")}
            />
          </label>
          <br />
          <button onClick={handleBooking} className='slotbook-btn'>{t("book_slot")}</button>
          {message && <div className="booking-msg"><p>{message}</p></div>}
        </div>
      )}
    </div>
  );
};

export default MonthlyDistributions;

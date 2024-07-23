import React, { useState } from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FormLayout = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    role: 'Driver',
    operational_time: '',
    route: '',
    angkutan_number: '',
    brand_car: '',
    series_car: '',
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    firstname: false,
    lastname: false,
    email: false,
    phone_number: false,
    operational_time: false,
    route: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: formData.username.trim() === '',
      password: formData.password.trim() === '',
      firstname: formData.firstname.trim() === '',
      lastname: formData.lastname.trim() === '',
      email: formData.email.trim() === '',
      phone_number: formData.phone_number.trim() === '',
      operational_time: formData.operational_time.trim() === '',
      route: formData.route.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const token = localStorage.getItem('authToken');

    try {
      console.log('backendUrl', backendUrl);

      const response = await fetch(`${backendUrl}/admin/driver`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Form submitted successfully!',
        }).then(() => {
          navigate('/tables');
          // Optionally clear the form or redirect
          // setFormData({
          //   username: '',
          //   password: '',
          //   firstname: '',
          //   lastname: '',
          //   email: '',
          //   phone_number: '',
          //   role: 'Driver',
          //   operational_time: '',
          //   route: '',
          //   angkutan_number: '',
          //   brand_car: '',
          //   series_car: '',
          // });
        });
      } else {
        console.error('Error:', response);
        Swal.fire({
          icon: 'error',
          title: 'Submission Error',
          text: 'Failed to submit the form. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Tambah Driver" />
 
      <div className="gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Driver Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.username && (
                      <span className="text-red-500">Username is required</span>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.password && (
                      <span className="text-red-500">Password is required</span>
                    )}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.firstname ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.firstname && (
                      <span className="text-red-500">
                        First name is required
                      </span>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.lastname ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.lastname && (
                      <span className="text-red-500">
                        Last name is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500">Email is required</span>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.phone_number ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.phone_number && (
                      <span className="text-red-500">
                        Phone number is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Operational Time
                    </label>
                    <input
                      type="text"
                      name="operational_time"
                      value={formData.operational_time}
                      onChange={handleChange}
                      placeholder="Enter your operational time"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.operational_time ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.operational_time && (
                      <span className="text-red-500">
                        Operational time is required
                      </span>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Brand Car
                    </label>
                    <input
                      type="text"
                      name="brand_car"
                      value={formData.brand_car}
                      onChange={handleChange}
                      placeholder="Enter your brand car"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Angkutan number
                    </label>
                    <input
                      type="text"
                      name="angkutan_number"
                      value={formData.angkutan_number}
                      onChange={handleChange}
                      placeholder="Enter your angkutan number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Series Car
                    </label>
                    <input
                      type="text"
                      name="series_car"
                      value={formData.series_car}
                      onChange={handleChange}
                      placeholder="Enter your series car"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Route
                  </label>
                  <input
                    type="text"
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    placeholder="Enter your route"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.route ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.route && (
                    <span className="text-red-500">Route is required</span>
                  )}
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;

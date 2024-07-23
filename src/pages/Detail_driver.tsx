import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams if you use React Router for route params
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Driver } from '../components/Tables/TableTwo';

interface FormData {
  username: string;
  password?: string; // Make password optional
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  role: string;
  operational_time: string;
  route: string;
  angkutan_number: string;
  brand_car: string;
  series_car: string;
}

const FormLayout = () => {
  const [listDrivers, setListDrivers] = useState<Driver[]>([]);
  const [formData, setFormData] = useState<FormData>({
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

    email: false,
    phone_number: false,
    operational_time: false,
    route: false,
  });
 const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams(); // Get the driver ID from URL params if needed
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await fetch(`${backendUrl}/admin/drivers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data && Array.isArray(data.drivers)) {
          console.log(data.drivers);
          setListDrivers(data.drivers);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    if (id) {
      fetchDriverData();
    }
  }, [id]);

  useEffect(() => {
    const selected = listDrivers.find(
      (driver) => driver.id === parseInt(id || '0'),
    );
    setFormData({
      username: selected?.username || '',
      password: '',
      firstname: selected?.firstname || '',
      lastname: selected?.lastname || '',
      email: selected?.email || '',
      phone_number: selected?.phone_number || '',
      role: 'Driver',
      operational_time: selected?.operational_time || '',
      route: selected?.route || '',
      angkutan_number: selected?.angkutan_number || '',
      brand_car: selected?.brand_car || '',
      series_car: selected?.series_car || '',
    });
  }, [id, listDrivers]);

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
      firstname: formData.firstname.trim() === '',
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
      // // Create a new object to hold updated data
      const updatedData = { ...formData };
      console.log(updatedData);

      // // Remove password field if it is empty
      if (!updatedData.password?.trim()) {
        delete updatedData.password;
      }

      console.log('Form submitted:', updatedData);

      const response = await fetch(
        `${backendUrl}/admin/driver/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response) {
        const result = await response.json();
        console.log('Success:', result);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Form submitted successfully!',
        }).then(() => {
          // Optionally clear the form or redirect
          setFormData({
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
          navigate('/tables');
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
            <div className="p-6.5">
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
                        <span className="text-red-500">
                          Username is required
                        </span>
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
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary $`}
                      />
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
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary `}
                      />
            
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
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary 
                        }`}
                      />
              
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
      </div>
    </>
  );
};

export default FormLayout;

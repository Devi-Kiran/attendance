import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import MainLayout from "../components/layouts/MainLayout";
import { toast } from "react-toastify";

function AddEmployer() {
  const employerData = {
    name: "",
    salaryPerAnnum: "",
    email: "",
    phone: "",
    attendanceCode: "",
    attendance: [],
  };
  const [employerDetails, setEmployerDetails] = useState(employerData);

  const employersCollectionRef = collection(db, "employers");

  const createEmployer = async () => {
    try {
      setEmployerDetails(employerData);
      await addDoc(employersCollectionRef, { ...employerDetails });
      toast.success("Employer successfully added");
    } catch (e) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <MainLayout>
        <form onSubmit={(e) => e.preventDefault()} method="post">
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3 md:col-span-2 sm:col-start-1">
                  <label
                    for="employerName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Employer Name
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      value={employerDetails.name}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      id="employerName"
                      autocomplete="off"
                      class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3 md:col-span-2">
                  <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      id="email"
                      value={employerDetails.email}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      autocomplete="off"
                      class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3 md:col-span-2">
                  <label
                    for="phone"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div class="mt-2">
                    <input
                      type="tel"
                      value={employerDetails.phone}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      id="phone"
                      autocomplete="off"
                      class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3 md:col-span-2">
                  <label
                    for="salary"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Salary P/A
                  </label>
                  <div class="mt-2">
                    <input
                      type="number"
                      id="salary"
                      value={employerDetails.salaryPerAnnum}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          salaryPerAnnum: e.target.value,
                        }))
                      }
                      autocomplete="off"
                      placeholder="In INR"
                      class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3 md:col-span-2">
                  <label
                    for="attendance-code"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Attendance Code
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      id="attendance-code"
                      value={employerDetails.attendanceCode}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          attendanceCode: e.target.value,
                        }))
                      }
                      autocomplete="off"
                      class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => setEmployerDetails(employerData)}
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={createEmployer}
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </MainLayout>
    </>
  );
}

export default AddEmployer;

import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../assets/hooks/fetch.users";
import avatar from "./../assets/profile.png";

const Adminhome = () => {
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] =
    useFetchUsers("/admin/getusers");
  // logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  if (isLoading)
    return (
      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-700 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-700 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  if (serverError) return <h1>{serverError}</h1>;
  return (
    <div className={"container mx-auto"}>
      <nav className={"bg-white border-gray-200 dark:bg-transparent"}>
        <div
          className={
            "flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4"
          }
        >
          <span
            className={
              "self-center text-4xl font-semibold whitespace-nowrap dark:text-blue-600"
            }
          >
            Admin
          </span>
          <div className={"flex items-center "}>
            <button
              onClick={handleLogout}
              className={
                "text-lg font-semibold  text-red-600 dark:text-red-500 hover:underline"
              }
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className={"relative overflow-x-auto shadow-md sm:rounded-lg"}>
        <table
          className={"w-full text-sm text-left text-white dark:text-white"}
        >
          <thead
            className={
              "text-xs text-white uppercase bg-blue-50 dark:bg-blue-500 dark:text-white-400"
            }
          >
            <tr>
              <th scope="col" className={"px-6 py-3"}>
                <div className={"flex items-center"}>Profile</div>
              </th>
              <th scope="col" className={"px-6 py-3"}>
                Username
              </th>
              <th scope="col" className={"px-6 py-3"}>
                <div className={"flex items-center"}>Firstname</div>
              </th>
              <th scope="col" className={"px-6 py-3"}>
                <div className={"flex items-center"}>Lastname</div>
              </th>
              <th scope="col" className={"px-6 py-3"}>
                <div className={"flex items-center"}>Address</div>
              </th>
              <th scope="col" className={"px-6 py-3"}>
                <span className={"sr-only"}>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {apiData?.map((doc) => {
              return (
                <tr
                  className={
                    "bg-white border-b dark:bg-blue-400 dark:border-blue-300"
                  }
                >
                  <th
                    scope="row"
                    className={
                      "px-6 py-4 font-medium text-gray-900  whitespace-nowrap dark:text-white"
                    }
                  >
                    <img
                      className="border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer;
    @apply hover:border-gray-200;"
                      style={{ width: "40px" }}
                      src={doc?.profile || avatar}
                      alt="proflie"
                    />
                  </th>
                  <td className={"px-6 py-4"}>{doc?.username}</td>
                  <td className={"px-6 py-4"}>{doc?.firstname}</td>
                  <td className={"px-6 py-4"}>{doc?.lastname}</td>
                  <td className={"px-6 py-4"}>{doc?.address}</td>
                  <td
                    className={
                      " px-6 py-4 text-right text-red-600 font-semibold"
                    }
                  >
                    <label className="relative inline-flex items-center mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-white rounded-full peer dark:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-50 peer-checked:bg-green-600"></div> 
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminhome;

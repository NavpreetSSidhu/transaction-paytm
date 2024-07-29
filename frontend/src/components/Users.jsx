import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/user/bulk?filter=${search}`
    );
    if (response.data.success) {
      setUsers(response.data.result);
    }
  };

  const debounceRequest = () => {
    setTimeout(() => {
      getUsers();
    }, 1000);
  };

  useEffect(() => {
    debounceRequest();
  }, [search]);

  return (
    <div className="font-bold mt-6 text-lg">
      <div>Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search User..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {users.map((user) => {
          return <User user={user} key={user._id} />;
        })}
      </div>
    </div>
  );
};

const User = ({ user }) => {
  const naviagte = useNavigate();
  const nav = () => {
    naviagte(`/send?id=${user._id}&name=${user.firstName}`);
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button onClick={nav} label={"Send Money"} />
      </div>
    </div>
  );
};

export default Users;

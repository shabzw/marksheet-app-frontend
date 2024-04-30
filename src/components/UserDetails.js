import React from "react";

export default function UserDetails({ userInfo }) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-7 offset-md-3">
          <div class="card">
            <div class="card-header">{userInfo?.role} Details</div>
            <div class="card-body">
              <p>
                <strong>ID Number:</strong> {userInfo?._id}
              </p>
              <p>
                <strong>Name:</strong> {userInfo?.name}
              </p>
              <p>
                <strong>Gender:</strong> {userInfo?.gender}
              </p>
              <p>
                <strong>Email:</strong> {userInfo?.email}
              </p>
              <p>
                <strong>Role:</strong> {userInfo?.role}
              </p>
              <p>
                <strong>Phone Number:</strong> {userInfo?.phoneNo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';


const ProfileUser = () => {
  return (
    <>
      <div className="container-scroller">
        <div className="horizontal-menu">
          <EnteteDash />
          <DashHeader />
        </div>
        <div className='container mt-5 pt-5 mb-5' >

          <div className='row' >

            <div className='col-md-9' >
              user simple
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProfileUser;

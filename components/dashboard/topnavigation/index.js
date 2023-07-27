import { useEffect } from 'react';
import { useToggle } from '../provider/context';
import Swal from 'sweetalert2';

export default function TopNavigation() {
  const { toggle } = useToggle();
  var Username = localStorage.getItem('username');
  Username = Username.replace(/^"|"$/g, '');
  const onLogout=()=> {
    Swal.fire({
      title: 'Success',
      text: 'Logout successful!',
      icon: 'success',
      confirmButtonText: 'Ok'
      }).then(() => {
        localStorage.clear();
    window.location.assign("/");
      })

    
}

  return (
    <header className="bg-white h-16 items-center relative shadow w-full z-10 md:h-20">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
          <div className="flex left-0 relative w-3/4">
            <div className="flex group h-full items-center relative w-12">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-4xl text-black focus:outline-none"
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
            <h1 className="font-bold">Welcome {Username}</h1>
             {/* logout button */}
            <button onClick={onLogout} className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

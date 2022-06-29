import * as usersService from '../../utilities/users-service'

export default function OrderHistoryPage() {

    // const handleCheckToken = () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         if (decodedToken.exp * 1000 < Date.now()) {
    //             localStorage.removeItem('token');
    //             this.setState({
    //                 isLoggedIn: false
    //             });
    //         } else {
    //             this.setState({
    //                 isLoggedIn: true
    //             });
    //         }
    //     } else {
    //         this.setState({
    //             isLoggedIn: false
    //         });
    //     }
    // }

    async function handleCheckToken () {
        // alert('clicked')
        const expDate = await usersService.checkToken()
        console.log(expDate)
    }

  return (
    <>
      <h1>OrderHistoryPage</h1>
      <button onClick={() => handleCheckToken()}>Check when my login expires</button>
    </>
  );
}

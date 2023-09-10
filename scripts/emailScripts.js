
const registerUser = ({ name, email, userId }) => {

    return {
        subject: "welcome to booking app",
        html: `
        <div>
        <h4>Hello ${name} , </h4>
        <br/>

        you have registered successfully to the movie booking app with email ${email}

        <br/>
        you can login anytime with userId: ${userId}

        <br/>
        <br/>
        <br/>


        <hr/>

        thanks and Regards
        <h3>Movie Booking Core Team</h3>
        <img src="https://img.freepik.com/premium-vector/illustration-cinema-movie-ticket-logo-vector-with-video-player-symbol-icon_629524-670.jpg?w=1060" height="100" width="100" />
        </div>
        `
    }

}

const paymentSuccess = () => {

}

const paymentfailed = () => {

}

const movieAdded = () => {

}

module.exports = {
    registerUser,
    paymentSuccess,
    paymentfailed,
    movieAdded
}
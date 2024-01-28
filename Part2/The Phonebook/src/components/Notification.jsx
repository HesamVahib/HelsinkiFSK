export const Notification = ({message}) => {
    const notifStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if( message === null){
        return null
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}

export const ErrorNotification = ({message}) => {
    const notifStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if( message === null){
        return null
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}
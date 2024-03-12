export const user_name = ({cookies}) => {
    return cookies.get("user")
}
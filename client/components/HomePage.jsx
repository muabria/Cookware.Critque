import LoginForm from "./AuthorizationForms/LoginForm"
import NewPostForm from "./NewPostForm"
import SearchCard from "./SearchEquipment/SearchCard"

const HomePage = () => {
    return (
        <>
            <SearchCard />
            <NewPostForm />
        </>
    )
}

export default HomePage
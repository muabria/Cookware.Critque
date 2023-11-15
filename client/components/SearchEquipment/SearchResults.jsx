 
 
 const SearchResults = (search) =>{
    const { data, error, isLoading } = useGetEquipmentQuery(search);

    //filter on front: prop with search term and load on frontend, OR return array of objects (map)
    //backend look at search params in URL (better performance, but more complex)
        //query parameters
 }
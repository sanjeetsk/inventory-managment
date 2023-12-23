function deleteProduct(id){
    const result = confirm("Are you sure want to delete?");
    if(result){
        fetch('/delete-product/' + id, {
            method: 'POST',
        }).then((res) => {
            if(res.ok){
                location.reload();
            }
        })
    }
}
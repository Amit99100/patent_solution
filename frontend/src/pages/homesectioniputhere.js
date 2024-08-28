<div className="container pt-5 pb-5">

    <div className="row">
        <div className="col-sm-3">
            <h2>Filter by category</h2>
            <form >
                <div className="form-group">
                    <select onChange={(e) => setCategory(e.target.value)} name="" id="" className='form-control'>
                        <option value="Select" disabled >Select</option>
                        {
                            categories && categories.map(cat => (
                                <option value={cat._id}>{cat.name}</option>
                            ))
                        }
                        <option value="">All</option>
                    </select>
                </div>
                {/* <button onClick={filterProduct} type='submit' className='btn btn-primary mt-3'>Filter</button> */}
            </form>
        </div>
        <div className="col-sm-9">
            <div className="row">
                {
                    products && products.map((p) => (
                        <Card image={p.image.url} productName={p.name} prodLink={`/product/${p._id}`} prodCategory={p.category ? p.category.name : ''} price={p.price} />
                    ))
                }
            </div>
            <Pagination current={pageNumber} total={count} onChange={(prev) => setPageNumber(prev)} pageSize={3} />
        </div>
    </div>




</div>
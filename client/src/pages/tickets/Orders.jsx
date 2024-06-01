import React from 'react'
import customFetch from '../../utils'
import styled from 'styled-components'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import ufcimg from '../../assets/landingImage.jpg'

export const loader = (queryClient) => async () => {
    try {
        const { data } = await customFetch('/tickets', { withCredentials: true })
        return data.orders;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect('/')
    }
}
const Orders = () => {
    const orders = useLoaderData();
    console.log(orders);
    const handleDownload = async (ticketId) => {
        try {
            const { data } = await customFetch('/tickets/download/' + ticketId);

            // Create a Blob object from the data string
            const blob = new Blob([data], { type: 'text/plain' });

            // Create a URL for the Blob object
            const url = window.URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `ticket_${ticketId}.txt`;
            document.body.appendChild(a);

            // Simulate a click on the link element to trigger the download
            a.click();

            // Clean up by revoking the URL object
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    if (orders.length === 0) {
        return <Wrapper style={{ display: 'grid', placeItems: 'center' }}>
            <h4>No tickets bought...</h4>
            <Link to={'/events'} style={{ marginTop: '-15rem' }} className='btn'> Buy some</Link>
        </Wrapper>
    }

    return (
        <Wrapper>
            <h4>My orders</h4>
            <div className="orders">
                {
                    orders.map(item => {
                        return <article key={item._id} className='order'>
                            <div className="img-container">
                                <img src={`http://localhost:5000/${item.image}`} alt="not found" className='img' />
                                <div className="header-info">
                                    <h5>{item.name}</h5>
                                </div>
                            </div>
                            <div className="info">
                                {
                                    item.orderItems.map((order) => {
                                        return <div key={order._id} className="ticket">
                                            <p>Ticket: </p>
                                            <p>Row : <span>{order.row}</span></p>
                                            <p>Column : <span>{order.column}</span></p>
                                            <p>Price : <span>{order.price}$</span></p>
                                            <p>({item.seatingLayout.sectionName})</p>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="btn-container">
                                <button className='btn bg-body-secondary'
                                    onClick={() => handleDownload(item._id)}>Download</button>
                            </div>
                        </article>
                    })
                }
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    height: auto;
    padding: 5rem 2rem;
    max-width: var(--max-width);
    margin: 0 auto;
    min-height: calc(100vh - 5rem);
    h4{
        text-align: center;
        letter-spacing: 10px;
    }
    .orders{
        margin-top: 2rem;
        display: grid;
        place-items: center;

    }
    .order{
        background-color: var(--grey-100);
        padding: 1rem;
        border-radius: var(--borderRadius);
        box-shadow:var(--shadow-2);
        margin-bottom:3rem;
        display: grid;
        gap: 1rem;
    }
    .order:hover{
        box-shadow:var(--shadow-4);
    }
    @media (min-width: 992px){
        .order{
            padding: 3rem;
        }
        .order{
            grid-template-columns: auto 1fr auto;
        }
        .info{
            margin-left: 1rem;
        }
        .img-container{
            img{
                height: 150px;
            }
        }
    }
    .img-container{
        height: 150px;
        display: grid;
        gap: 2rem;
        h5{
            letter-spacing: 3px;
        }
        p{
            letter-spacing: 3px;
        }
        margin-bottom:1rem
    }
    .img{
        height: 80px;
        border-radius: var(--borderRadius);
    }
    .ticket{
        display: flex;
        flex-wrap:wrap;
        column-gap: 1rem;
        p{
            color: var(--grey-500);
        }
        p:first-child{
            font-weight:bold;
        }
    }
    .header-info{
        display: flex;
        column-gap: 1rem;
    }
    @media (min-width: 600px){
        .img-container{
            height: 150px;
            display: grid;
            grid-template-columns: 200px auto;
        }
        .img{
            height: 120px;
        }
        .header-info{
            flex-direction: column;
         }
    }

    .btn {
            position: relative;
            display: inline-block;
            border: 2px solid black;
            border-radius: 0;
            color: black;
            padding: 0.7rem 3rem;
            overflow: hidden;
            transition: 0.5s all ease-in;
            text-transform:uppercase;
            font-weight:bold;
        }
        .btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: red;
            transition: 0.5s all ease-in;
        }

        .btn:hover {
            background-color: var(--grey-200);
        }

        .btn:hover::before {
            width: 100%;
        }
    
`

export default Orders
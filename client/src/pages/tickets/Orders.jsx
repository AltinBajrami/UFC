import React from 'react'
import customFetch from '../../utils'
import styled from 'styled-components'
import { redirect, useLoaderData } from 'react-router-dom'
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
    return (
        <Wrapper>
            <h4>My orders</h4>
            <div className="orders">
                {
                    orders.map(item => {
                        return <article key={item._id} className='order'>
                            <div className="img-container">
                                <img src={ufcimg} alt="not found" className='img' />
                                <div className="header-info">
                                    <h5>{item.event}</h5>
                                    <p>Arena Name</p>
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
                                <button className='btn bg-body-secondary'>Download Ticket</button>
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
    }
    .order{
        background-color: var(--grey-100);
        padding: 1rem;
        border-radius: var(--borderRadius);
        box-shadow:var(--shadow-2);
        margin-bottom:1rem;
        display: grid;
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
    
`

export default Orders
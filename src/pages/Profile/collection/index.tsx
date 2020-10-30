import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar'
import Card from '../../../components/card'
import { ImagePattern } from '../../../components/card'
import './index.css'
import api from '../../../services/api'

const Home = (props: any) => {

    const [params] = useState<{collection: string, user: string}>(props.match.params)
    const [posts, setPosts] = useState<ImagePattern[]>()

    useEffect(() => {
        api.get(`/collection?collection=${params.collection}&user=${params.user}`).then((response) => {
            setPosts(response.data.result)
        }) 
    }, [params])

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <div id="photos">
                    {posts?.map((v, i) => {
                        return <Card id={v.id} liked={v.liked} likes={v.likes} platform={v.platform} thumb={v.thumb} url={v.url} user={v.user} userImageUrl={v.userImageUrl} key={v.id + v.platform} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
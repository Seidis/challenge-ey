import { useEffect, useState } from 'react';

import Cards from '../Cards';

import Grid from '@mui/material/Unstable_Grid2';
import { Skeleton, Typography } from '@mui/material';

import { IVagas } from 'data/__interfaces';

// export default function Recomended({ list, loading }: { list: any[], loading: boolean }) {
export default function Recomended() {
    const [counter, setCounter] = useState(3);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && setLoading(false);
    }, [counter]
    );


    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom align='center'>
                Recomendadas
            </Typography>
            <Grid
                container
                spacing={2}
            >
                {
                    list.map((item, index) => (
                        <Grid
                            key={index}
                            display='flex'
                            justifyContent='center'
                            xs={12} sm={6} md={4}
                        >
                            {loading ? (
                                <div>
                                    <Skeleton variant='rectangular' width={345} height={140} />
                                    <Skeleton variant='text' width={345} height={60} />
                                    <Skeleton variant='text' width={300} height={30} />
                                    <Skeleton variant='text' width={320} height={30} />
                                    <Skeleton variant='text' width={290} height={30} />
                                    <Skeleton variant='text' width={310} height={30} />
                                    <Skeleton variant='text' width={70} height={30} />
                                </ div>
                            ) : (
                                <Cards
                                    img={item.img}
                                    title={item.title}
                                    tags={item.tags}
                                    short_description={item.short_description}
                                    text={item.text}
                                />
                            )}
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

const list: IVagas[] = [
    {
        img: 'https://source.unsplash.com/random',
        title: 'Vaga 1',
        tags: ['tag1', 'tag2', 'tag3'],
        short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        text: '',
    },
    {
        img: 'https://source.unsplash.com/random',
        title: 'Vaga 2',
        tags: ['tag1', 'tag2', 'tag3'],
        short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        text: '',
    },
    {
        img: 'https://source.unsplash.com/random',
        title: 'Vaga 3',
        tags: ['tag1', 'tag2', 'tag3'],
        short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        text: '',
    }
];
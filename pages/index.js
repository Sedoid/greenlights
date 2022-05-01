import Head from 'next/head'
import Script from 'next/script'
import { PostCard,Categories, PostWidget, Advertisement, Follow} from '../components'
import { getPosts } from '../services'
import { VisuallyHidden,Box, Input, InputRightElement, InputGroup, Button,useColorModeValue,Text, Stack, chakra, Flex, isTruncated, Link } from '@chakra-ui/react'
import { FaServer,FaGamepad,FaApple,FaDesktop,FaCode, FaGlobeAfrica, FaPaintBrush, FaC } from 'react-icons/fa';

import { FeaturedPosts } from '../sections'
import Topics from '../components/Topics'

export default function Home({posts}) {

  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        // as={'a'} 
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  return (
    
    <div className="container mx-auto  pb-8">
      <Head>
        <title>Developers Craft</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Check out  Articles in pidgin and english about African Local Cultures, Agriculture, Music, Health and Languages meant to Educate and Entertain you." />
        <link rel="canonical" href="https://thegreenlights.net" />
        <link rel="manifest" href='/manifest.json' />

        <meta property="og:type" content="website" />

        <meta property="og:title" content="GreenLights" />

        <meta property="og:description" content="Check out  Articles in pidgin and english about African Local Cultures, Agriculture, Music, Health and Languages meant to Educate and Entertain you." />

        <meta property="og:image" content="https://thegreenlights.net/favicon.ico" />

        <meta property="og:url" content="https://thegreenlights.net" />

        <meta property="og:site_name" content="GreenLights" />


        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6951101662003064"
        crossorigin="anonymous">
        </Script>
      </Head>
      
      {/* SearchBar Section */}
      <InputGroup  
            bg={useColorModeValue('white', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            className='rounded-md' size='lg' alignItems="center" justifyContent="center"  mb={8} >
        <Input
          pr='4.5rem'
          placeholder='Whats on your mind'
          height={70}
          className='rounded-md'
        />
        <InputRightElement width='6rem' className='position-relative top-10'>
          <Button bg="green.400" color="white" className='hover:bg-green-800' mt={5}  mr={5} p={5} size='md'>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>


      {/* Popular Search Section */}
      <Flex   mb={8}>
        <Text id="popular_searches" className='xs:hidden md:block'   flexGrow={1}>
          Categories: 
        </Text>
        <Box flexGrow={6} >
          <Stack direction={'row'} justifyContent="space-between"  align="center" mb={5} >

                <Box maxW="30%" flexGrow={1}>
                  <Text className='category transition duration-700 cursor-pointer hover:text-green-600' noOfLines = {1} textAlign="start">
                    <Link href="./category/ui-ux-design">          
                      <SocialButton label={'Twitter'}  href={'./category/ui-ux-design'}>
                      <FaPaintBrush color="" />
                      </SocialButton>  
                      &nbsp;UI/UX Design
                     </Link>            
                  </Text>
                </Box>


                <Box  maxW="30%" flexGrow={1}>
                <Text className='category transition duration-700 cursor-pointer hover:text-green-600' flexGrow={1}  textAlign="start"  noOfLines = {1}>
                  <Link href="./category/web-development">          
                    <SocialButton label={'YouTube'} href={'./category/web-development'}>
                    <FaGlobeAfrica color='' />
                    </SocialButton>   
                    &nbsp;Web Development
                  </Link>       
                </Text>

                </Box>


                <Box  maxW="30%" flexGrow={1}>
                <Text className='category transition duration-700 cursor-pointer hover:text-green-600'  textAlign="start"  noOfLines = {1} >
                  <Link href="./category/backend-architecture">
                    <SocialButton label={'Instagram'} href={'./category/backend-architecture'}>
                    <FaServer color='' />
                    </SocialButton>    
                    &nbsp;Backend Architectures                    
                  </Link>
                </Text>
                </Box>

          </Stack>

          <Stack direction={'row'}  justifyContent="space-between"  align="center">

          <Box   maxW="30%"  flexGrow={1}>
          <Text className='category transition duration-700 cursor-pointer hover:text-green-600'  textAlign="start"   noOfLines = {1} flexGrow={1}>
            <Link href="./category/game-development">
                <SocialButton label={'Instagram'} href={'./category/game-development'}>
                <FaGamepad color='' />
                </SocialButton>  
                &nbsp;Game Development       
            </Link>
          </Text>
          </Box>


          <Box  maxW="30%"  flexGrow={1}>
          <Text className='category transition duration-700 cursor-pointer hover:text-green-600'  textAlign="start"   noOfLines = {1} flexGrow={1} >
            <Link href="./category/app-development">
              <SocialButton label={'sports'} href={'./category/app-development'}>
              <FaApple color="" />
              </SocialButton>  
              &nbsp;App Develpment             
            </Link>
     
          </Text>
            
          </Box>


          <Box maxW="30%"  flexGrow={1}>
          <Text textAlign="start" className="category transition duration-700 cursor-pointer hover:text-green-600"   noOfLines = {1}>
            <Link textDecoration="none" href="./category/programming-concepts">
              <SocialButton label={'finance'} href={'./category/programming-concepts'} >
              <FaCode color='' />
              </SocialButton> 
              &nbsp; Programming Concepts             
            </Link>

          </Text>        
          </Box>

          </Stack>
        </Box>
      </Flex>

      {/* <FeaturedPosts /> */}
      <Box className=" grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main section for posts  */}
          <div className="lg:col-span-8 col-span-1">
              {
              posts.map((post,index) => <PostCard post={post.node} index={index} key={index} />)
              } 
            </div>

        {/* side section for categories and stuffs */}
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">      
              <Advertisement/>
              <Follow />
              <Topics />
              <Categories />
              {/* <PostWidget /> */}
            </div>
          </div>
      </Box>

    </div>

  )
}


export async function getStaticProps(){
  const posts = (await getPosts()) || [];

  return {
    props:{ posts }
  }
}
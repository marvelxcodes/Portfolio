import Link from 'next/link';
import SocialIcon from './SocialIcon';

const Footer = () => {
	return (
		<footer className='border-t space-y-5 text-center py-5'>
			<div className='space-x-8 font-medium text-center'>
				<Link className='text-center' href='/'>Home</Link>
				<Link className='text-center' href='/blog'>Blog</Link>
				<Link className='text-center' href='mailto:ramakrishnan0046@gmail.com'>Contact Me</Link>
				<Link className='text-center' href='https://www.fiverr.com/marvelxcodes'>Hire Me</Link>
				<Link className='text-center' href=''></Link>
			</div>
			<div className='flex justify-center gap-x-8'>
				<SocialIcon
					name='Instagram'
					href='https://www.instagram.com/marvelxcodes'
					src='/social-media/instagram.svg'
				/>
				<SocialIcon
					name='Github'
					href='https://github.com/marvelxcodes'
					src='/social-media/github.svg'
				/>
				<SocialIcon
					name='LinkedIn'
					href='https://www.linkedin.com/in/marvelxcodes/'
					src='/social-media/linkedin.svg'
				/>
				<SocialIcon
					name='Stack Overflow'
					href='https://stackoverflow.com/users/18178949/marvelxcodes'
					src='/social-media/stack-overflow.svg'
				/>
				<SocialIcon
					name='X'
					href='https://twitter.com/marvelxcodes'
					src='/social-media/x.svg'
				/>
			</div>
			<div>
				<p className='text-sm'>© 2023 theramakrishnan.com. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;

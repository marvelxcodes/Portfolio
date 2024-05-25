import Link from 'next/link';
import SocialMediaLink from './SocialMediaLink';

const Footer = () => {
	return (
		<footer className='border-t space-y-5 text-center py-5 text-white'>
			<div className='space-x-8 font-medium text-center'>
				<Link
					className='text-center'
					href='/'
				>
					Home
				</Link>
				<Link
					className='text-center'
					href='/blog'
				>
					Blog
				</Link>
				<Link
					className='text-center'
					href='mailto:ramakrishnan0046@gmail.com'
				>
					Contact Me
				</Link>
				<Link
					className='text-center'
					href='https://www.fiverr.com/marvelxcodes'
				>
					Hire Me
				</Link>
				<Link
					className='text-center'
					href=''
				></Link>
			</div>
			<div className='flex justify-center gap-x-6'>
				<SocialMediaLink
					name='Instagram'
					href='https://www.instagram.com/marvelxcodes/'
					color='#E1306C'
				/>
				<SocialMediaLink
					name='Linkedin'
					href='https://www.linkedin.com/in/marvelxcodes'
					color='#0077B'
				/>
				<SocialMediaLink
					name='Github'
					href='https://github.com/marvelxcodes'
					color='#fff'
				/>
				<SocialMediaLink
					name='Stack Overflow'
					href='https://stackoverflow.com/users/18178949/marvelx0046'
					color='F59342'
				/>
				<SocialMediaLink
					name='X'
					href='https://twitter.com/marvelxcodes'
					color='#1DA1F2'
				/>
			</div>
			<div>
				<p className='text-sm'>
					© 2024 theramakrishnan.com. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;

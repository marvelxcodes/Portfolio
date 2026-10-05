import Hero from '@/components/sections/Hero';
import Curious from '@/components/sections/Curious';
import Stories from '@/components/sections/Stories';
import Services from '@/components/sections/Services';
import Reasons from '@/components/sections/Reasons';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

/**
 * The story, in order.
 *
 * The register alternates deliberately: peach hero → cream → the beige Success
 * Stories plate → cream → full inversion for the argument → cream → peach
 * closer. Each chapter owns its own scroll choreography; the shader plate and
 * the smooth-scroll rig live in the layout so they persist across routes.
 */
const Home = () => (
	<main>
		<Hero />
		<Curious />
		<Stories />
		<Services />
		<Reasons />
		<Process />
		<Contact />
	</main>
);

export default Home;

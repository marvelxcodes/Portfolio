const JsonLd = ({ data }: { data: object }) => (
	<script
		type='application/ld+json'
		// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized with '<' escaped
		dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
	/>
);

export default JsonLd;

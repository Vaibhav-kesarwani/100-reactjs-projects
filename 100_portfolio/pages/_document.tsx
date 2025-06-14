import Layout from '@/components/layout/Layout'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Layout>
					<Main />
				</Layout>
				<NextScript />
			</body>
		</Html>
	)
}

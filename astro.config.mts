import starlight from '@astrojs/starlight';
import ui from '@studiocms/ui';
import { defineConfig } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator'
import starlightSidebarTopics from 'starlight-sidebar-topics';
import getCoolifyURL from './hostUtils.ts';
import rehypePlugins from './src/plugins/rehypePluginKit.ts';
import { typeDocPlugins } from './typedoc.config.ts';
import { getTranslations } from './starlight-sidebar/translate.ts';
import { devServerFileWatcher } from './src/integrations/dev-file-watcher.ts';
import { remarkFallbackLang } from './src/plugins/remark-fallback-pages.ts';

// Define the Site URL
const site = getCoolifyURL(true) || 'https://docs.studiocms.dev/';

export const locales = {
	en: { label: 'English', lang: 'en' },
	es: { label: 'Español', lang: 'es' },
	de: { label: 'Deutsch', lang: 'de' },
	// ja: { label: '日本語', lang: 'ja' },
	fr: { label: 'Français', lang: 'fr' },
	// it: { label: 'Italiano', lang: 'it' },
	// id: { label: 'Bahasa Indonesia', lang: 'id' },
	// 'zh-cn': { label: '简体中文', lang: 'zh-CN' },
	// 'pt-br': { label: 'Português do Brasil', lang: 'pt-BR' },
	// 'pt-pt': { label: 'Português', lang: 'pt-PT' },
	ko: { label: '한국어', lang: 'ko' },
	// tr: { label: 'Türkçe', lang: 'tr' },
	// ru: { label: 'Русский', lang: 'ru' },
	// hi: { label: 'हिंदी', lang: 'hi' },
	// da: { label: 'Dansk', lang: 'da' },
	// uk: { label: 'Українська', lang: 'uk' },
};

export default defineConfig({
	site,
	image: {
		remotePatterns: [{ protocol: 'https' }],
	},
	markdown: {
		rehypePlugins,
		remarkPlugins: [remarkFallbackLang()],
	},
	trailingSlash: 'always',
	integrations: [
		devServerFileWatcher([
			'./hostUtils.ts',
			'./typedoc.config.ts',
			'./starlight-types.ts',
			'./starlight-sidebar/*',
			'./src/content.ts',
			'./src/share-link.ts',
			'./src/util/*.ts',
			'./src/plugins/*.{ts,js}',
			'./src/integrations/*.ts',
		]),
		ui(),
		starlight({
			title: 'StudioCMS',
			description: 'A dedicated CMS for Astro DB. Built from the ground up by the Astro community.',
			favicon: '/logo-light.svg',
			lastUpdated: true,
			credits: true,
			tagline: 'A dedicated CMS for Astro DB. Built from the ground up by the Astro community.',
			disable404Route: true,
			pagefind: false,
			components: {
				SiteTitle: './src/starlightOverrides/SiteTitle.astro',
				PageTitle: './src/starlightOverrides/PageTitle.astro',
				Sidebar: './src/starlightOverrides/Sidebar.astro',
				Head: './src/starlightOverrides/Head.astro',
				Search: './src/starlightOverrides/Search.astro',
			},
			logo: {
				dark: './assets/logo-light.svg',
				light: './assets/logo-dark.svg',
			},
			defaultLocale: 'en',
			locales,
			social: {
				github: 'https://github.com/withstudiocms/studiocms',
				discord: 'https://chat.studiocms.dev',
				youtube: 'https://www.youtube.com/@StudioCMS',
				'x.com': 'https://x.com/withstudiocms',
				blueSky: 'https://bsky.app/profile/studiocms.dev',
				openCollective: 'https://opencollective.com/StudioCMS',
			},
			customCss: [
				'@studiocms/ui/css/global.css',
				'./src/styles/sponsorcolors.css',
				'./src/styles/starlight.css',
			],
			editLink: {
				baseUrl: 'https://github.com/withstudiocms/docs/tree/main',
			},
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://analytics.studiocms.dev/script.js',
						'data-website-id': 'e924da68-f547-4dd2-bd2f-bcdd78cbcdab',
						defer: true,
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'og:image',
						content: `${site}og.png`,
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: `${site}og.png`,
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:site',
						content: 'withstudiocms',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:creator',
						content: 'withstudiocms',
					},
				},
			],
			plugins: [
				...typeDocPlugins,
				starlightLinksValidator({
					errorOnFallbackPages: false,
					errorOnInconsistentLocale: true,
					exclude: ['/*/typedoc/**/*']
				}),
				starlightImageZoom(),
				starlightSidebarTopics([
					{
						label: getTranslations('topic-learn'),
						link: '/start-here/getting-started/',
						icon: 'open-book',
						id: 'learn',
						items: [
							{
								label: getTranslations('start-here').en,
								translations: getTranslations('start-here'),
								autogenerate: { directory: 'start-here' },
							},
							{
								label: getTranslations('contributing').en,
								translations: getTranslations('contributing'),
								autogenerate: { directory: 'contributing' },
							},
							{
								label: getTranslations('how-it-works').en,
								translations: getTranslations('how-it-works'),
								autogenerate: { directory: 'how-it-works' },
							},
							{
								label: getTranslations('utils').en,
								translations: getTranslations('utils'),
								autogenerate: { directory: 'utils' },
							},
							{
								label: getTranslations('plugins').en,
								translations: getTranslations('plugins'),
								autogenerate: { directory: 'plugins' },
							},
						],
					},
					{
						label: getTranslations('topic-package-catalog'),
						link: '/package-catalog/',
						icon: 'download',
						id: 'package-catalog',
						items: [
							{
								label: getTranslations('catalog').en,
								translations: getTranslations('catalog'),
								link: '/package-catalog',
							},
							{
								label: getTranslations('studiocms-plugins').en,
								translations: getTranslations('studiocms-plugins'),
								autogenerate: { directory: 'package-catalog/studiocms-plugins' },
							},
							{
								label: getTranslations('community-plugins').en,
								translations: getTranslations('community-plugins'),
								autogenerate: { directory: 'package-catalog/community-plugins' },
							},
						],
					},
					{
						label: getTranslations('topic-references'),
						link: '/config-reference/',
						icon: 'information',
						id: 'references',
						items: [
							{
								label: getTranslations('config-reference').en,
								translations: getTranslations('config-reference'),
								autogenerate: { directory: 'config-reference' },
							},
							{
								label: getTranslations('typedoc').en,
								translations: getTranslations('typedoc'),
								badge: {
									text: getTranslations('auto-gen'),
									variant: 'tip',
								},
								items: [
									{
										label: 'studiocms',
										autogenerate: { directory: 'typedoc/studiocms' },
										collapsed: true,
									},
									{
										label: '@studiocms/blog',
										autogenerate: { directory: 'typedoc/studiocms-blog' },
										collapsed: true,
									},
									{
										label: '@studiocms/devapps',
										autogenerate: { directory: 'typedoc/studiocms-devapps' },
										collapsed: true,
									},
									{
										label: '@studiocms/markdoc',
										autogenerate: { directory: 'typedoc/studiocms-markdoc' },
										collapsed: true,
									},
									{
										label: '@studiocms/mdx',
										autogenerate: { directory: 'typedoc/studiocms-mdx' },
										collapsed: true,
									},
								],
							},
						],
					},
				]),
			],
		}),
	],
});

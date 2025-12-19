const { connectDB } = require('./src/models/db');


const seedPosts = [
    {
        title: 'Liberals Demand Schools Teach Puppies to Protest',
        content: 'Liberal activists are reportedly forcing schools to teach puppies how to protest. Parents are confused, dogs are excited, and Twitter is ablaze with outrage over tiny signs that say "More Treats, Less Taxes!"',
        author: 'LiberalPost Staff',
        category: 'Politics',
        slug: 'puppies-protest-schools',
        createdAt: new Date('2025-12-15')
    },
    {
        title: 'New Vaccine Turns Kids Into Rainbow Unicorns, Liberals Celebrate',
        content: 'Scientists announce a new vaccine that not only prevents diseases but also temporarily gives kids rainbow-colored horns. Liberals call it "progressive magic," conservatives call it "government sorcery."',
        author: 'LiberalPost Staff',
        category: 'Health',
        slug: 'vaccine-rainbow-unicorns',
        createdAt: new Date('2025-12-16')
    },
    {
        title: 'Local Liberals Petition to Replace Money With Compliments',
        content: 'A group of local liberals is pushing to replace all currency with compliments. "Pay your rent with kind words!" reads one viral tweet. Economists are skeptical, children are excited.',
        author: 'LiberalPost Staff',
        category: 'Society',
        slug: 'compliments-instead-of-money',
        createdAt: new Date('2025-12-17')
    },
    {
        title: 'Liberals Launch Campaign to Make Broccoli Mandatory at All Parties',
        content: 'In a surprising twist, liberal influencers demand broccoli be served at every social event. Partygoers report being mildly annoyed but strangely healthier.',
        author: 'LiberalPost Staff',
        category: 'Health',
        slug: 'broccoli-at-parties',
        createdAt: new Date('2025-12-18')
    },
    {
        title: 'Senator Claims Dogs Now Have Right to Vote, Liberals Throw Parade',
        content: 'A liberal senator allegedly proposed that dogs should be allowed to vote in local elections. Twitter explodes, dogs remain confused but tail-wagging.',
        author: 'LiberalPost Staff',
        category: 'Politics',
        slug: 'dogs-right-to-vote',
        createdAt: new Date('2025-12-19')
    },
    {
        title: 'Liberals Invent Sunglasses That Detect Microaggressions in the Wild',
        content: 'A group of engineers unveils AI-powered glasses that highlight microaggressions in real time. Wearers report spotting them everywhere—from coffee shops to cereal boxes.',
        author: 'LiberalPost Staff',
        category: 'Technology',
        slug: 'microaggression-glasses',
        createdAt: new Date('2025-12-20')
    },
    {
        title: 'City Council Approves Law Requiring Citizens to Compliment Strangers Daily',
        content: 'Liberals push for law forcing daily compliments to strangers. Conservatives call it tyranny. Locals call it weirdly uplifting. Instagram influencers are thrilled.',
        author: 'LiberalPost Staff',
        category: 'Society',
        slug: 'daily-compliments-law',
        createdAt: new Date('2025-12-21')
    }
];

async function seedArticles() {
    try {
        const db = await connectDB();
        const collection = db.collection('posts');

        for (const post of seedPosts) {
            const existing = await collection.findOne({ slug: post.slug });
            if (!existing) {
                await collection.insertOne({
                    id: Date.now().toString() + Math.floor(Math.random() * 1000),
                    ...post
                });
                console.log(`Dodano post: ${post.title}`);
            } else {
                console.log(`Post już istnieje: ${post.title}`);
            }
        }

        console.log('Seedowanie zakończone.');
        process.exit(0);
    } catch (err) {
        console.error('Błąd podczas seedowania:', err);
        process.exit(1);
    }
}

seedArticles();

import 'dotenv/config';
import { customers, insertCustomerSchema, lenders, insertLendersSchema, insertLoanOffersSchema, loanOffers, insertFeesSchema, fees } from './schema';
import { database } from '.';

async function seed() {
  const customer = insertCustomerSchema.parse({
    first_name: 'Neil',
    last_name: 'Gardose',
    email: 'sample@email.com',
    employment_status: 'Employed',
    employer_name: 'Sample Employer'
  })

  await database.insert(customers).values(customer);
  console.log('New customer created!');

  /**
   * Seeding lender recommendations
   */
  const lender1 = insertLendersSchema.parse({
    name: "Lender A"
  })

  const lender2 = insertLendersSchema.parse({
    name: "Lender B"
  })

  const lender3 = insertLendersSchema.parse({
    name: "Lender B"
  })

  const dbResult = await database
    .insert(lenders)
    .values([lender1, lender2, lender3])
    .returning()

  console.log('New Lenders created!');
  console.log(dbResult);

  dbResult.map(async (item) => {
    const randomLoanOffer = insertLoanOffersSchema.parse({
      lender_id: item.id,
      repayment_value: String(Math.floor(Math.random() * (500 - 200 + 1)) + 200),
      repayment_frequency: 'monthly',
      interest_rate: String(Math.random() * (0.08 - 0.03) + 0.03),
      interest_frequency: "APR",
			active: 1,
    });

    const loanOfferItems = await database
      .insert(loanOffers)
      .values(randomLoanOffer)
      .returning();

    const aLoanOffer = loanOfferItems[0]
    const randomFee = insertFeesSchema.parse({
      loan_offer_id: aLoanOffer.id,
      amount:
        String(Math.floor(Math.random() * (200 - 100 + 1)) + 100),
      category:
        String(Math.random() < 0.5 ? 'application' : 'processing')
    });

    await database
      .insert(fees)
      .values(randomFee)
  })

  console.log('--------------------------------------------------')
  console.log('Set of lenders generated!');
  console.log('--------------------------------------------------')
}

seed();

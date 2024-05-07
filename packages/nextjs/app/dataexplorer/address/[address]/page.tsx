import { BackButton } from "../../_components";
import { Address } from "~~/components/scaffold-eth";

type PageProps = {
  params: { address: string };
};

export function generateStaticParams() {
  // An workaround to enable static exports in Next.js, generating single dummy page.
  return [{ address: "0x0000000000000000000000000000000000000000" }];
}

const AddressPage = async ({ params }: PageProps) => {
  const data = [[params.address, 3, 6, 5, 8, 3]];
  const schema = {
    schemaName: "schemaName1",
    columns: ["col1", "col2", "col3", "col4", "col5"],
    category: "gaming",
    createdBy: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    totalRecords: 100,
  };
  return (
    <>
      <div className="m-10 mb-20">
        <div className="flex justify-start mb-5">
          <BackButton />
        </div>
        <div className="flex justify-center px-4 md:px-0">
          <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
            <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
              <thead>
                <tr className="rounded-xl text-sm text-base-content">
                  <th className="bg-primary">Address</th>
                  {schema.columns.map(i => (
                    <>
                      <th className="bg-primary" key={i}>
                        {i}
                      </th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(dpoint => (
                  <>
                    <tr>
                      {dpoint.map((i, index) => (
                        <>
                          {index == 0 ? (
                            <td className="md:py-4">
                              <Address address={String(i)} size="sm" />
                            </td>
                          ) : (
                            <td>{i}</td>
                          )}
                        </>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
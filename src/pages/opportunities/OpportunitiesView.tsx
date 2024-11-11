import Main from '../../layout/Main';
import OpportunityTable from '../../components/opportunities/ListOpportunities';

const OpportunitiesView = () => {
    return <Main>
        <section className="flex justify-center">
            <section className="w-[80vw] h-[80vh] flex flex-col gap-5 mt-5 justify-center items-center bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <div className="w-full flex justify-between items-center pb-4 border-b border-gray-300">
                    <h3 className="text-xl font-bold text-slate-700">Opportunities List</h3>
                </div>
                <OpportunityTable />
            </section>
        </section>
      </section>
    </Main>
  );
};

export default OpportunitiesView;

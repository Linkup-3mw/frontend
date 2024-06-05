import EnterPriseMembershipSearch from './components/EnterPriseMembershipSearch';
import AllSearchMembership from './components/allSearchMembership';

export default function myMembership() {
  return (
    <div>
      <div>멤버십 전체 조회</div>
      <AllSearchMembership />
      <div>기업 멤버십 전체 조회</div>
      <EnterPriseMembershipSearch />
    </div>
  );
}

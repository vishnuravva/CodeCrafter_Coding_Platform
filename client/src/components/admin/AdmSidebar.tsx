import { ArrowRightFromLine } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import code2 from "../../assets/images/code2.png";
import { Link } from "react-router-dom";

export function AdmSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="cursor-pointer" onClick={() => {}}>
          <ArrowRightFromLine />
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <img src={code2} width={50} height={50} alt="hello" />
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Link to={"/admin/problems"}>Problems</Link>
          <div>Problems</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

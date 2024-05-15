import { Button, Stack } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface PagerProps {
  current: number;
  startsFrom?: number;
  onNext(): void;
  onPrev(): void;
}

export function Pager({ current, onNext, onPrev, startsFrom = 1 }: PagerProps) {
  return (
    <Stack direction="row" sx={{ mb: 3 }} spacing={2}>
      <Button variant="contained" startIcon={<SkipPreviousIcon />} onClick={onPrev} disabled={current === startsFrom}>
        Previous
      </Button>
      <Button variant="outlined" disabled>
        {current}
      </Button>
      <Button variant="contained" endIcon={<SkipNextIcon />} onClick={onNext}>
        Next
      </Button>
    </Stack>
  );
}
